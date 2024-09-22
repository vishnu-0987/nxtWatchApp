import './index.css'

const ButtonItem = props => {
  const {item, clickSidebar, selected, isDark} = props
  const {image, buttonName} = item

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
    <li onClick={() => clickSidebar(buttonName)} className={className}>
      {image}
      <p>{buttonName}</p>
    </li>
  )
}

export default ButtonItem
