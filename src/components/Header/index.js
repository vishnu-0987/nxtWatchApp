import {Component} from 'react'
import {IoMoon, IoSunnyOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {Redirect, withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Theme from '../../Context/Theme'

import './index.css'

class Header extends Component {
  state = {
    redirectToLogin: false, // State to handle redirection
    showPopup: false, // State to show the popup
  }

  logout = () => {
    // Cookies.remove('jwt_token')
    this.setState({showPopup: true})
    // Uncomment the following line if you want to redirect immediately after logout
    // this.setState({ redirectToLogin: true })
  }

  closePopupAndRedirect = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
    this.setState({redirectToLogin: true})
  }

  closePopUp = () => {
    this.setState({showPopup: false})
  }

  render() {
    const {redirectToLogin, showPopup} = this.state

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
                <Link to="/">
                  <img
                    src={
                      isDark
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="website logo"
                    className="header-logo"
                  />
                </Link>
                <div className="header-nav-right-container">
                  {/* React icons use */}
                  {isDark ? (
                    <IoSunnyOutline
                      className={`header-icons ${
                        isDark ? 'dark-header-icons' : ''
                      }`}
                      onClick={toggleTheme}
                      data-testid="theme"
                    />
                  ) : (
                    <IoMoon
                      className={`header-icons ${
                        isDark ? 'dark-header-icons' : ''
                      }`}
                      onClick={toggleTheme}
                      data-testid="theme"
                    />
                  )}

                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    className="header-icons-profile"
                    alt="profile"
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

              {/* Show popup if logout is triggered */}
              {showPopup && (
                <div className="popup-container">
                  <Popup
                    modal
                    open={showPopup}
                    overlayStyle={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
                  >
                    {close => (
                      <>
                        <div
                          className={`popup-main ${
                            isDark ? 'popup-main-dark' : ''
                          }`}
                        >
                          <p>Are you sure, you want to logout?</p>
                          <div>
                            <button
                              type="button"
                              className={`cancel-button ${
                                isDark ? 'cancel-button-dark' : ''
                              }`}
                              onClick={() => this.closePopUp()}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="confirm-button"
                              onClick={this.closePopupAndRedirect}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </Popup>
                </div>
              )}
            </div>
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default withRouter(Header)
