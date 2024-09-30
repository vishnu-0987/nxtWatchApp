import React from 'react'

const Theme = React.createContext({
  isDark: true,
  toggleTheme: () => {},
  savedVideos: [],
  addVideos: () => {},
  removeVideos: () => {},
})

export default Theme
