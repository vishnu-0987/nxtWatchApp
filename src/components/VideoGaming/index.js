import {Link} from 'react-router-dom'
import './index.css'

const VideoGaming = props => {
  const {details, isDark} = props
  console.log(isDark)
  const {id, title, thumbnailUrl, viewCount} = details

  // Parsing the publishedAt string into a Date object

  return (
    <li className="li-container-gaming">
      <Link
        className="link-container-gaming"
        style={{textDecoration: 'none'}}
        to={`/videos/${id}`}
      >
        <img src={thumbnailUrl} alt="video thumbnail" />

        <div className="right-video-css">
          <p
            className={`title-video-css ${
              isDark ? 'title-video-css-dark' : 'title-video-css-light'
            }`}
          >
            {title}
          </p>

          <div className="time-container">
            <p
              className={`common-video-css ${
                isDark ? 'common-video-css-dark' : ''
              }`}
            >
              {viewCount} Watching Worldwide
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoGaming
