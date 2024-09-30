// src/components/VideoItem/index.js
import {formatDistanceToNowStrict, parse} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {details, isDark} = props
  console.log(isDark) // Consider removing in production

  const {
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = details

  // Parsing the publishedAt string into a Date object
  const publishedDate = parse(publishedAt, 'MMM dd, yyyy', new Date())

  // Getting the time difference in a human-readable format
  const timeAgo = formatDistanceToNowStrict(publishedDate, {addSuffix: true})

  return (
    <li className="li-container">
      <Link
        className="link-container"
        style={{textDecoration: 'none'}}
        to={`/videos/${id}`}
      >
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="inside-li-container">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div className="right-video-css">
            <p
              className={`title-video-css ${
                isDark ? 'title-video-css-dark' : 'title-video-css-light'
              }`}
            >
              {title}
            </p>
            <p
              className={`common-video-css ${
                isDark ? 'common-video-css-dark' : 'common-video-css-light'
              }`}
            >
              {name}
            </p>
            <div className="time-container">
              <p
                className={`common-video-css ${
                  isDark ? 'common-video-css-dark' : 'common-video-css-light'
                }`}
              >
                {viewCount} views
              </p>
              <span className="bullet">&#8226;</span>
              <p
                className={`common-video-css ${
                  isDark ? 'common-video-css-dark' : 'common-video-css-light'
                }`}
              >
                {timeAgo}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoItem
