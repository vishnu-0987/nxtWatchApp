import {formatDistanceToNowStrict, parse} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const VideoTrending = props => {
  const {details, isDark} = props
  console.log(isDark)
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
    <li className="li-container-trending">
      <Link
        className="link-trending-container"
        style={{textDecoration: 'none'}}
        to={`/videos/${id}`}
      >
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div className="inside-li-container inside-li-container-trending">
          <div className="right-video-css right-video-trending-css">
            <h1
              className={`title-video-css ${
                isDark ? 'title-video-css-dark' : 'title-video-css-light'
              }`}
            >
              {title}
            </h1>
            <p
              className={`common-video-css ${
                isDark ? 'common-video-css-dark' : ''
              }`}
            >
              {name}
            </p>
            <div className="time-container">
              <p
                className={`common-video-css ${
                  isDark ? 'common-video-css-dark' : ''
                }`}
              >
                {viewCount} views
              </p>
              <span className="bullet">&#8226;</span>
              <p
                className={`common-video-css ${
                  isDark ? 'common-video-css-dark' : ''
                }`}
              >
                {timeAgo}
              </p>{' '}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoTrending
