import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ButtonItem from '../ButtonItem'

import Theme from '../../Context/Theme'

const buttonItems = [
  {
    image: <AiFillHome className="sidebar-logos" />,
    buttonName: 'Home',
    path: '',
  },
  {
    image: <HiFire className="sidebar-logos" />,
    buttonName: 'Trending',
    path: 'trending',
  },
  {
    image: <SiYoutubegaming className="sidebar-logos" />,
    buttonName: 'Gaming',
    path: 'gaming',
  },
  {
    image: <CgPlayListAdd className="sidebar-logos" />,
    buttonName: 'Saved Videos',
    path: 'saved-videos',
  },
]

class Sidebar extends Component {
  state = {clickedItem: ''}

  componentDidMount() {
    const {clicked} = this.props
    this.setState({
      clickedItem: clicked,
    })
  }

  clickSidebar = id => {
    this.setState({
      clickedItem: id,
    })
  }

  render() {
    const {clickedItem} = this.state

    return (
      <Theme.Consumer>
        {value => {
          const {isDark} = value

          return (
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
                <p
                  className={
                    isDark
                      ? 'social-media-heading-dark'
                      : 'social-media-heading-light'
                  }
                >
                  CONTACT US
                </p>
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
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default Sidebar
