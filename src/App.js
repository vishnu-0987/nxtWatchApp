import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Theme from './Context/Theme'

import './App.css'

class App extends Component {
  state = {isDark: false}

  toggleTheme = () => {
    this.setState(prev => ({
      isDark: !prev.isDark,
    }))
  }

  render() {
    const {isDark} = this.state
    return (
      <Theme.Provider value={{isDark, toggleTheme: this.toggleTheme}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <NotFound />
        </Switch>
      </Theme.Provider>
    )
  }
}

export default App
