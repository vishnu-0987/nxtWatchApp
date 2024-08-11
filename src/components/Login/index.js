import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Theme from '../../Context/Theme'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  changeUsername = e => {
    this.setState({
      username: e.target.value,
    })
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
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form className="form-login-container" onSubmit={this.submitForm}>
            <div className="input-label-div">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="input-label-div">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
            {isError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
