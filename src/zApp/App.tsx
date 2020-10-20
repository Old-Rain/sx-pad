import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@/store'
import { getToken } from '@/utils/userInfo'

import { ConfigProvider } from 'antd'
import Header from './components/Header'
import Aside from './components/Aside'
import Loading from '@/components/Loading'

import Login from '@/views/Login'
import TheRouter from '@/TheRouter'

import styles from './App.module.scss'

import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
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
                    <Suspense fallback={<Loading />}>
                      <TheRouter />
                    </Suspense>
                  </article>
                </div>
              </div>
            </>
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>
  )
}

export default App
