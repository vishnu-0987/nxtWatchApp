import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {IoMdClose} from 'react-icons/io'

import Header from '../Header'
import ButtonItem from '../ButtonItem'
import Theme from '../../Context/Theme'

import './index.css'

const buttonItems = [
  {
    image: <AiFillHome className="sidebar-logos" />,
    buttonName: 'Home',
  },
  {
    image: <HiFire className="sidebar-logos" />,
    buttonName: 'Trending',
  },
  {
    image: <SiYoutubegaming className="sidebar-logos" />,
    buttonName: 'Gaming',
  },
  {
    image: <CgPlayListAdd className="sidebar-logos" />,
    buttonName: 'Saved Videos',
  },
]

class Home extends Component {
  state = {clickedItem: 'Home', bannerClose: false}

  clickSidebar = id => {
    this.setState({
      clickedItem: id,
    })
  }

  bannerChange = () => {
    this.setState(prev => ({
      bannerClose: !prev.bannerClose,
    }))
  }

  render() {
    const {clickedItem, bannerClose} = this.state
    return (
      <Theme.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div className="bg-home-container">
              <Header />
              <div className="home-main-bg-container">
                <div
                  className={`home-dashboard-container ${
                    isDark ? 'dark-dashboard' : 'light-dashboard'
                  }`}
                >
                  <ul className="upper-dashboard-content">
                    {buttonItems.map(item => (
                      <ButtonItem
                        item={item}
                        key={item.buttonName}
                        clickSidebar={this.clickSidebar}
                        selected={clickedItem}
                        isDark={isDark}
                      />
                    ))}
                  </ul>

                  <div className="lower-dashboard-content">
                    <h4
                      className={
                        isDark
                          ? 'social-media-heading-dark'
                          : 'social-media-heading-light'
                      }
                    >
                      CONTACT US
                    </h4>
                    <div className="social-media-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </div>
                    <p
                      className={
                        isDark
                          ? 'social-media-para-dark'
                          : 'social-media-para-light'
                      }
                    >
                      Enjoy! Now to see your channels and recommendations!
                    </p>
                  </div>
                </div>
                <div
                  className={`home-content-container ${
                    isDark ? 'dark-home-content' : 'light-home-content'
                  }`}
                >
                  <div
                    className={
                      !bannerClose
                        ? 'home-container-premium-banner'
                        : 'banner-close'
                    }
                    // data-testid="banner"
                  >
                    <div className="left-premium-content">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>

                    <IoMdClose
                      //   data-testid="close"
                      className="close-button"
                      onClick={this.bannerChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default Home
