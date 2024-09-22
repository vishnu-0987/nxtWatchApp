import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Theme from '../../Context/Theme'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isChecked: false,
    isError: false,
  }

  changeUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  changeType = () => {
    this.setState(prev => ({
      isChecked: !prev.isChecked,
    }))
  }

  changePassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  onSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({
      errorMsg,
      isError: true,
    })
  }

  submitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, isChecked, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <Theme.Consumer>
        {value => {
          const {isDark} = value
          console.log(isDark)

          return (
            <div
              className={
                isDark ? 'login-bg-dark-container' : 'login-bg-light-container'
              }
            >
              <div
                className={
                  isDark ? 'login-dark-container' : 'login-light-container'
                }
              >
                <img
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="login-logo"
                />
                <form
                  className="form-login-container"
                  onSubmit={this.submitForm}
                >
                  <div className="input-label-div">
                    <label
                      className={isDark ? 'label-dark' : 'label-light'}
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className={`input-field ${
                        isDark ? 'input-dark-field' : 'input-light-field'
                      }`}
                      placeholder="Username"
                      id="username"
                      value={username}
                      onChange={this.changeUsername}
                    />
                  </div>
                  <div className="input-label-div">
                    <label
                      className={isDark ? 'label-dark' : 'label-light'}
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <input
                      type={isChecked ? 'text' : 'password'}
                      className="input-field"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={this.changePassword}
                    />
                    <div className="show-password-container">
                      <input
                        type="checkbox"
                        id="checkbox"
                        onChange={this.changeType}
                      />
                      <label
                        htmlFor="checkbox"
                        className={
                          isDark ? 'label-show-dark' : 'label-show-light'
                        }
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="login-submit-button">
                    Login
                  </button>
                  {isError && <p className="error-msg">*{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default Login
