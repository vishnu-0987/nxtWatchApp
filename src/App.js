import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import Theme from './Context/Theme'

import './App.css'

class App extends Component {
  state = {isDark: false, savedVideos: []}

  componentDidMount() {
    const savedVideos = localStorage.getItem('savedVideos')
    if (savedVideos) {
      this.setState({savedVideos: JSON.parse(savedVideos)})
    }

    const savedTheme = localStorage.getItem('isDark')
    if (savedTheme) {
      this.setState({isDark: JSON.parse(savedTheme)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {savedVideos, isDark} = this.state

    // Save savedVideos to Local Storage whenever it changes
    if (prevState.savedVideos !== savedVideos) {
      localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
    }

    // Save theme preference to Local Storage whenever it changes
    if (prevState.isDark !== isDark) {
      localStorage.setItem('isDark', JSON.stringify(isDark))
    }
  }

  toggleTheme = () => {
    this.setState(prev => ({
      isDark: !prev.isDark,
    }))
  }

  addVideos = newVideo => {
    this.setState(prev => {
      const isAlreadySaved = prev.savedVideos.some(
        video => video.id === newVideo.id,
      )
      if (isAlreadySaved) {
        return null // No state update needed
      }
      return {savedVideos: [...prev.savedVideos, newVideo]}
    })
  }

  removeVideos = id => {
    this.setState(prev => ({
      savedVideos: prev.savedVideos.filter(video => video.id !== id),
    }))
  }

  render() {
    const {isDark, savedVideos} = this.state
    return (
      <Theme.Provider
        value={{
          isDark,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addVideos: this.addVideos,
          removeVideos: this.removeVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <NotFound />
        </Switch>
      </Theme.Provider>
    )
  }
}

export default App
