import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNowStrict, parse} from 'date-fns'

import {IoMdClose, IoIosSearch} from 'react-icons/io'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {BiDislike, BiLike} from 'react-icons/bi'

import {CgPlayListAdd} from 'react-icons/cg'

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

class VideoItemDetails extends Component {
  state = {
    isLoading: loadingOptions.initial,
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedList = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      console.log(fetchedList)
      this.setState({
        isLoading: loadingOptions.success,
        videoDetails: fetchedList,
      })
    } else {
      this.setState({
        isLoading: loadingOptions.failed,
        videoDetails: {},
      })
    }
  }

  like = () => {
    const {isLiked, isDisliked} = this.state
    if (isDisliked) {
      this.setState(prev => ({
        isLiked: !prev.isLiked,
        isDisliked: !prev.isDisliked,
      }))
    } else {
      this.setState(prev => ({
        isLiked: !prev.isLiked,
      }))
    }
  }

  dislike = () => {
    const {isLiked, isDisliked} = this.state
    if (isLiked) {
      this.setState(prev => ({
        isLiked: !prev.isLiked,
        isDisliked: !prev.isDisliked,
      }))
    } else {
      this.setState(prev => ({
        isDisliked: !prev.isDisliked,
      }))
    }
  }

  submit = (videoDetails, removeVideos, addVideos) => {
    const {isSaved} = this.state
    if (isSaved) {
      removeVideos(videoDetails.id)
      this.setState({
        isSaved: false,
      })
    } else {
      addVideos(videoDetails)
      this.setState({
        isSaved: true,
      })
    }
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

  successOutput = (isDark, removeVideos, addVideos) => {
    const {videoDetails, isLiked, isDisliked, isSaved} = this.state
    const publishedDate = parse(
      videoDetails.publishedAt,
      'MMM dd, yyyy',
      new Date(),
    )
    const timeAgo = formatDistanceToNowStrict(publishedDate, {addSuffix: true})

    let classNameLight = 'video-container-logos'

    if (isLiked) {
      classNameLight += ' blue-color'
    } else if (isDark) {
      classNameLight += ' video-container-logos-dark'
    }

    let classNameDark = 'video-container-logos'

    if (isDisliked) {
      classNameDark += ' blue-color'
    } else if (isDark) {
      classNameDark += ' video-container-logos-dark'
    }

    let classNameSave = 'video-container-logos'

    if (isSaved) {
      classNameSave += ' blue-color'
    } else if (isDark) {
      classNameSave += ' video-container-logos-dark'
    }

    return (
      <div
        className={`video-details-container ${
          isDark ? 'video-details-container-dark' : ''
        }`}
      >
        <ReactPlayer
          url={videoDetails.videoUrl}
          height="510px"
          width="1090px"
          style={{marginBottom: '5px'}}
        />
        <p
          className={`video-details-title ${
            isDark ? 'video-details-title-dark' : ''
          }`}
        >
          {videoDetails.title}
        </p>
        <div
          className={`views-and-likes-container ${
            isDark ? 'views-and-likes-container-dark' : ''
          }`}
        >
          <div className="views-and-time-container">
            <p>{videoDetails.viewCount} views</p>
            <span className="dot">&#8226;</span>
            <p>{timeAgo}</p>
          </div>
          <div className="likes-dislikes-and-save-container">
            <div>
              <button
                type="button"
                aria-label="like"
                onClick={this.like}
                className={`button-like ${isDark ? 'button-like-dark' : ''}`}
              >
                {isLiked ? (
                  <AiFillLike
                    className={classNameLight}
                    style={{
                      fill: '#3b82f6',
                      fontSize: '20px',
                      marginRight: '4px',
                    }}
                  />
                ) : (
                  <BiLike
                    className={`liked-disliked-css ${
                      isDark ? 'liked-disliked-dark-css' : ''
                    }`}
                  />
                )}
                Like
              </button>
            </div>
            <div>
              <button
                type="button"
                aria-label="dislike"
                onClick={this.dislike}
                className={`button-like ${isDark ? 'button-like-dark' : ''}`}
              >
                {isDisliked ? (
                  <AiFillDislike
                    style={{
                      fill: '#3b82f6',
                      fontSize: '20px',
                      marginRight: '4px',
                    }}
                  />
                ) : (
                  <BiDislike
                    className={`liked-disliked-css ${
                      isDark ? 'liked-disliked-dark-css' : ''
                    }`}
                  />
                )}
                Dislike
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`button-like ${isDark ? 'button-like-dark' : ''}`}
                style={{marginLeft: '-10px'}}
                onClick={() =>
                  this.submit(videoDetails, removeVideos, addVideos)
                }
              >
                <CgPlayListAdd
                  className={classNameSave}
                  style={{fontSize: '20px'}}
                />
                Save
              </button>
            </div>
          </div>
        </div>
        <hr className={`hr-line ${isDark ? 'hr-line-dark' : ''}`} />
        <div className="video-details-bottom-container">
          <img src={videoDetails.profileImageUrl} alt="channel logo" />
          <div className="right-video-details-bottom-container">
            <p className={`channel-name ${isDark ? 'channel-name-dark' : ''}`}>
              {videoDetails.name}
            </p>
            <p
              className={`subscriber-count ${
                isDark ? 'subscriber-count-dark' : ''
              }`}
            >
              {videoDetails.subscriberCount} subscribers
            </p>
            <p
              className={`description-channel ${
                isDark ? 'description-channel-dark' : ''
              }`}
            >
              {videoDetails.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  searchClick = () => {
    this.getVideoDetails()
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

  renderVideosSection = (isDark, removeVideos, addVideos) => {
    const {isLoading} = this.state
    console.log(isDark)
    switch (isLoading) {
      case loadingOptions.inProgress:
        return this.loaderOutput(isDark)
      case loadingOptions.success:
        return this.successOutput(isDark, removeVideos, addVideos)
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
          const {isDark, addVideos, removeVideos} = value

          return (
            <div className="bg-home-container" data-testid="videoItemDetails">
              <Header />
              <div className="home-main-bg-container">
                <Sidebar clicked="" />
                <div
                  className={`home-content-container ${
                    isDark ? 'dark-home-content' : 'light-home-content'
                  }`}
                >
                  <div className="home-main-videos-container">
                    {this.renderVideosSection(isDark, removeVideos, addVideos)}
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

export default VideoItemDetails
