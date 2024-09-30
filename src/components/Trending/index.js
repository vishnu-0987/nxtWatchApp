import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {IoMdClose, IoIosSearch} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'

import Cookies from 'js-cookie'
import Header from '../Header'
import VideoTrending from '../VideoTrending'
import Sidebar from '../Sidebar'
import Theme from '../../Context/Theme'

import './index.css'

const loadingOptions = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Trending extends Component {
  state = {
    videosList: [],
    isLoading: loadingOptions.initial,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    const {videosList} = this.state
    this.setState({
      isLoading: loadingOptions.inProgress,
    })
    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/trending`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const fetchedList = data.videos.map(item => ({
        id: item.id,
        title: item.title,
        thumbnailUrl: item.thumbnail_url,
        name: item.channel.name,
        profileImageUrl: item.channel.profile_image_url,
        viewCount: item.view_count,
        publishedAt: item.published_at,
      }))
      console.log(fetchedList)
      this.setState({
        isLoading: loadingOptions.success,
        videosList: fetchedList,
      })
    } else {
      this.setState({
        isLoading: loadingOptions.failed,
        videosList: [],
      })
    }
  }

  searchClick = () => {
    this.getVideosList()
  }

  loaderOutput = isDark => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        height={50}
        width={50}
        color={isDark ? '#ffffff' : '#3b82f6'}
      />
    </div>
  )

  successOutput = isDark => {
    const {videosList} = this.state

    return (
      <ul className="ul-container-trending">
        {videosList.map(item => (
          <VideoTrending details={item} key={item.id} isDark={isDark} />
        ))}
      </ul>
    )
  }

  failureOutput = isDark => (
    <div
      className={`failure-output-container ${
        isDark ? 'failure-dark' : 'failure-light'
      }`}
    >
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p style={{marginTop: '-12px'}}>Please try again.</p>
      <button type="button" onClick={this.searchClick}>
        Retry
      </button>
    </div>
  )

  renderVideosSection = isDark => {
    const {isLoading} = this.state
    console.log(isDark)
    switch (isLoading) {
      case loadingOptions.inProgress:
        return this.loaderOutput(isDark)
      case loadingOptions.success:
        return this.successOutput(isDark)
      case loadingOptions.failed:
        return this.failureOutput(isDark)

      default:
        return null
    }
  }

  render() {
    return (
      <Theme.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div className="bg-home-container" data-testid="trending">
              <Header />
              <div className="home-main-bg-container">
                <Sidebar clicked="Trending" />
                <div
                  className={`home-content-container ${
                    isDark ? 'dark-home-content' : 'light-home-content'
                  }`}
                >
                  <div
                    className={`heading-section ${
                      isDark ? 'heading-section-dark' : ''
                    }`}
                  >
                    <div
                      className={`logo-trending-container ${
                        isDark ? 'logo-trending-container-dark' : ''
                      }`}
                    >
                      <HiFire className="hifire-heading" />
                    </div>
                    <h1>Trending</h1>
                  </div>
                  {this.renderVideosSection(isDark)}
                </div>
              </div>
            </div>
          )
        }}
      </Theme.Consumer>
    )
  }
}

export default Trending
