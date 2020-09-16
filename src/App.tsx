import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import styles from './App.module.scss'

import Login from './views/Login'
import Header from './components/Header'

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
                    <Link to="/home">home</Link>
                    <br />
                    <Link to="/hdgl">hdgl</Link>
                  </aside>
                  <article>
                    <Route path="/" exact render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={() => <div>home</div>} />
                    <Route path="/hdgl" component={() => <div>hdgl</div>} />
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
