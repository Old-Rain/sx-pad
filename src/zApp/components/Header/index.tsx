import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import store from '@/store'
import { AUTH } from '@/store/modules/auth/actionTypes'

import { clearUserInfo } from '@/utils/userInfo'

import styles from './index.module.scss'

interface HeaderProps extends RouteComponentProps {}

const Header: FC<HeaderProps> = (props: PropsWithChildren<HeaderProps>) => {
  function logout() {
    // 清除用户信息
    clearUserInfo()

    // 卸载所有权限
    store.dispatch({ type: AUTH.AUTH_UPDATE, value: false })

    props.history.push('/login')
  }

  return (
    <header className={styles.Header}>
      <div className={styles.logo}>
        <h1>
          <Link className="logo" to="/home">
            营业部智慧经营平台
          </Link>
        </h1>
      </div>

      <button onClick={logout}>退出</button>
    </header>
  )
}

export default withRouter(Header)
