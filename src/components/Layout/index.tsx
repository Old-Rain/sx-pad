import React, { Suspense, lazy } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Route } from 'react-router-dom'

import styles from './index.module.scss'

import Header from './Header'
import Aside from './Aside'

// 首页
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ '@/views/Home'))

// 会议管理
const Meeting = lazy(() => import(/* webpackChunkName: 'Session' */ '@/views/Session/Meeting'))
const MissionCenter = lazy(() => import(/* webpackChunkName: 'Session' */ '@/views/Session/MissionCenter'))

// 活动管理
const InteractiveTack = lazy(() => import(/* webpackChunkName: 'Action' */ '@/views/Action/InteractiveTack'))
const SmartManageBoard = lazy(() => import(/* webpackChunkName: 'Action' */ '@/views/Action/SmartManageBoard'))

interface LayoutProps {}

const Layout: FC<LayoutProps> = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={styles.Layout}>
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
  )
}

export default Layout
