import {Component} from 'react'
import {IoMoon, IoSunnyOutline} from 'react-icons/io5'
import {HiUserCircle} from 'react-icons/hi'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Theme from '../../Context/Theme'

import './index.css'

class Header extends Component {
  state = {
    redirectToLogin: false, // State to handle redirection
  }

  logout = () => {
    Cookies.remove('jwt_token')
    this.setState({redirectToLogin: true}) // Trigger redirection after logout
  }

  render() {
    const {redirectToLogin} = this.state

    // Check state and render Redirect if needed
    if (redirectToLogin) {
      return <Redirect to="/login" />
    }

    return (
      <Theme.Consumer>
        {value => {
          const {isDark, toggleTheme} = value

          return (
            <div className={`header-container ${isDark ? 'dark-header' : ''}`}>
              <nav className="nav-header-container">
                <img
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="header-logo"
                />
                <div className="header-nav-right-container">
                  {/* React icons use */}
                  {isDark ? (
                    <IoSunnyOutline
                      className={`header-icons ${
                        isDark ? 'dark-header-icons' : ''
                      }`}
                      onClick={toggleTheme}
                      //   data-testid="theme"
                    />
                  ) : (
                    <IoMoon
                      className={`header-icons ${
                        isDark ? 'dark-header-icons' : ''
                      }`}
                      onClick={toggleTheme}
                      //   data-testid="theme"
                    />
                  )}

                  <HiUserCircle
                    className={`header-icons ${
                      isDark ? 'dark-header-icons' : ''
                    }`}
                  />
                  <button
                    className={
                      isDark ? 'logout-dark-button' : 'logout-light-button'
                    }
                    type="button"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default Header
