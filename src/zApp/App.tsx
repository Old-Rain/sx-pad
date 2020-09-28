import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { getToken } from '@/utils/userInfo'

import styles from './App.module.scss'

import Login from '../views/Login'
import Header from './components/Header'
import Aside from './components/Aside'

// 首页
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ '@/views/Home'))

// 会议管理
const Meeting = lazy(() => import(/* webpackChunkName: 'Session' */ '@/views/Session/Meeting'))
const MissionCenter = lazy(() => import(/* webpackChunkName: 'Session' */ '@/views/Session/MissionCenter'))

// 活动管理
const InteractiveTack = lazy(() => import(/* webpackChunkName: 'Action' */ '@/views/Action/InteractiveTack'))
const SmartManageBoard = lazy(() => import(/* webpackChunkName: 'Action' */ '@/views/Action/SmartManageBoard'))

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={getToken() ? '/home' : '/login'} />} />
        <Route path="/login" component={Login} />
        <>
          <div className={styles.layout}>
            <Header />
            <div className={styles.body}>
              <aside className={styles.ignore}>
                <Aside />
              </aside>
              <article>
                <Suspense fallback={<div>loading...</div>}>
                  <Route path="/home" component={Home} />
                  <Route path="/meeting" component={Meeting} />
                  <Route path="/missionCenter" component={MissionCenter} />
                  <Route path="/interactiveTrack" component={InteractiveTack} />
                  <Route path="/smartManageBoard" component={SmartManageBoard} />
                </Suspense>
              </article>
            </div>
          </div>
        </>
      </Switch>
    </Router>
  )
}

export default App
