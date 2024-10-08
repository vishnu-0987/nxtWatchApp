import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {IoMdClose, IoIosSearch} from 'react-icons/io'

import Cookies from 'js-cookie'
import Header from '../Header'
import VideoItem from '../VideoItem'
import Sidebar from '../Sidebar'
import Theme from '../../Context/Theme'

import './index.css'

const loadingOptions = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {
    bannerClose: false,
    searchInput: '',
    videosList: [],
    isLoading: loadingOptions.initial,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    const {searchInput, videosList} = this.state
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
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
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

  bannerChange = () => {
    this.setState(prev => ({
      bannerClose: !prev.bannerClose,
    }))
  }

  searchInputChange = e => {
    this.setState({
      searchInput: e.target.value,
    })
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
      <>
        {videosList.length === 0 ? (
          <div
            className={`failure-output-container ${
              isDark ? 'failure-dark' : 'failure-light'
            }`}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={this.searchClick}>
              Retry
            </button>
          </div>
        ) : (
          <ul className="ul-container">
            {videosList.map(item => (
              <VideoItem details={item} key={item.id} isDark={isDark} />
            ))}
          </ul>
        )}
      </>
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
    const {bannerClose, searchInput} = this.state
    return (
      <Theme.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div className="bg-home-container" data-testid="home">
              <Header />
              <div className="home-main-bg-container">
                <Sidebar clicked="Home" />
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
                    data-testid="banner"
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
                      data-testid="close"
                      className="close-button"
                      onClick={this.bannerChange}
                    />
                  </div>
                  <div className="home-main-videos-container">
                    <div className="search-bar-container">
                      <input
                        className={`search-input ${
                          isDark ? 'dark-search' : 'light-search'
                        }`}
                        placeholder="Search"
                        type="search"
                        value={searchInput}
                        onChange={this.searchInputChange}
                      />
                      <div
                        className={`search-logo-container ${
                          isDark ? 'search-logo-dark' : 'search-logo-light'
                        }`}
                      >
                        <IoIosSearch
                          data-testid="searchButton"
                          onClick={this.searchClick}
                        />
                      </div>
                    </div>
                    {this.renderVideosSection(isDark)}
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
