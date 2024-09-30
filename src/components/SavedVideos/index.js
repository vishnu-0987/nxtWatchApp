import {Component} from 'react'
import Loader from 'react-loader-spinner'

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

class SavedVideos extends Component {
  state = {isLoading: loadingOptions.success}

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

  successOutput = (isDark, savedVideos) => {
    console.log(isDark, isDark)

    return (
      <ul className="ul-container-trending">
        {/* {console.log(savedVideos)} */}
        {savedVideos.map(item => (
          <VideoTrending details={item} key={item.id} isDark={isDark} />
        ))}
      </ul>
    )
  }

  renderVideosSection = (isDark, savedVideos) => {
    const {isLoading} = this.state
    // console.log(savedVideos)
    console.log(isDark)
    switch (isLoading) {
      case loadingOptions.inProgress:
        return this.loaderOutput(isDark)
      case loadingOptions.success:
        return this.successOutput(isDark, savedVideos)

      default:
        return null
    }
  }

  render() {
    return (
      <Theme.Consumer>
        {value => {
          const {isDark, savedVideos} = value

          return (
            <div className="bg-home-container" data-testid="savedVideos">
              <Header />
              <div className="home-main-bg-container">
                <Sidebar clicked="Saved Videos" />
                <div
                  className={`home-content-container ${
                    isDark ? 'dark-home-content' : 'light-home-content'
                  }`}
                >
                  <div className="home-main-videos-container">
                    {/* {console.log(savedVideos)} */}
                    {this.renderVideosSection(isDark, savedVideos)}
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

export default SavedVideos
