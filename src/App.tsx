import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { getToken } from '@/utils/userInfo'

import Aside from './components/Aside'
import Header from './components/Header'
import styles from './App.module.scss'

import Login from './views/Login'

function App() {
  return (
    <Suspense fallback={() => <div>loading...</div>}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => (
              <div className={styles.App}>
                <Header />
                <div className={styles.AppBody}>
                  <aside>
                    <Aside />
                  </aside>
                  <article>
                    <Route path="/" exact render={() => <Redirect to={getToken() ? '/home' : '/login'} />} />
                    <Route path="/home" component={() => <div>home</div>} />
                    <Route path="/interactiveTrack" component={() => <div>interactiveTrack</div>} />
                    <Route path="/smartManageBoard" component={() => <div>smartManageBoard</div>} />
                  </article>
                </div>
              </div>
            )}
          />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
