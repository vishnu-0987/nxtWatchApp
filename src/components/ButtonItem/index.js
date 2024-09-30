import {Link} from 'react-router-dom'
import './index.css'

const ButtonItem = props => {
  const {item, clickSidebar, selected, isDark} = props
  const {image, buttonName, path} = item

  // Determine the class name based on the selected and dark mode states
  let className = 'button-list-item dark-sidebar-button'
  if (selected === buttonName) {
    className = !isDark
      ? 'selected-sidebar light-selected-sidebar-button'
      : 'selected-sidebar dark-selected-sidebar-button'
  } else if (!isDark) {
    className = 'button-list-item light-sidebar-button'
  }

  return (
    <Link to={`/${path}`} className="link-button-item">
      <li onClick={() => clickSidebar(buttonName)} className={className}>
        {image}
        <p>{buttonName}</p>
      </li>
    </Link>
  )
}

export default ButtonItem
