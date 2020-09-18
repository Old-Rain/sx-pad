import React, { useEffect, useRef, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import QRCode from 'qrcode'

import logo from '@/assets/logo.png'
import styles from './index.module.scss'

import { login as loginAPI, loginQRCode } from '@/api/login'
import { UserInfo } from '@/store/modules/user/types'

interface LoginProps extends RouteComponentProps {}

const Login: FC<LoginProps> = (props: PropsWithChildren<LoginProps>) => {
  const [qrcodeStatus, setQrcodeStatus] = useState<0 | 1>(1)

  const canvas = useRef<HTMLCanvasElement>(null)

  const qrcodeTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getQRCode()

    return () => {
      clearTimeout(Number(qrcodeTimer.current))
    }
  }, [])

  async function getQRCode() {
    const { data: res } = await loginQRCode<string>()

    setQrcodeStatus(1)

    QRCode.toCanvas(
      canvas.current,
      `${res.data}${Math.random()}`,
      { width: (window.innerWidth * 300) / 1366 },
      function (error) {
        if (error) console.error(error)
        console.log('success!')
      },
    )

    qrcodeTimer.current = setTimeout(() => setQrcodeStatus(0), 5000)
  }

  async function login() {
    const { data: res } = await loginAPI<UserInfo>({ username: '', password: '' })
    console.log(res)
    props.history.push('/home')
  }

  return (
    <div className={styles.Login}>
      <div className={styles.board}>
        <h1>
          <img src={logo} alt="" />
        </h1>

        <div className={styles.form}>
          <button onClick={login}>login</button>
          <canvas ref={canvas} className={styles.canvas}></canvas>
          <div style={{ display: qrcodeStatus ? 'none' : 'block' }} onClick={getQRCode}>
            刷新
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
