import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
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
      <button onClick={logout}>logout</button>
    </header>
  )
}

export default withRouter(Header)
