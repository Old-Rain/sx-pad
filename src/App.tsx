import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { getToken } from '@/utils/userInfo'

import Login from './views/Login'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={getToken() ? '/home' : '/login'} />} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  )
}

export default App
