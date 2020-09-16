import React from 'react'
import { FC, PropsWithChildren } from 'react'

import logo from '@/assets/logo.png'
import styles from './index.module.scss'

interface LoginProps {}

const Login: FC<LoginProps> = (props: PropsWithChildren<LoginProps>) => {
  return (
    <div className={styles.Login}>
      <div className={styles.board}>
        <h1>
          <img src={logo} alt="" />
        </h1>

        <div className={styles.form}></div>
      </div>
    </div>
  )
}

export default Login
