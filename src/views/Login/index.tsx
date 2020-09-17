import React, { useEffect, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import QRCode from 'qrcode'

import logo from '@/assets/logo.png'
import styles from './index.module.scss'

interface LoginProps extends RouteComponentProps {}

const Login: FC<LoginProps> = (props: PropsWithChildren<LoginProps>) => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    QRCode.toCanvas(
      canvas.current,
      'sample text',
      {
        width: 300,
      },
      function (error) {
        if (error) console.error(error)
        console.log('success!')
      },
    )
  })

  return (
    <div className={styles.Login}>
      <div className={styles.board}>
        <h1>
          <img src={logo} alt="" />
        </h1>

        <div className={styles.form}>
          <button onClick={() => props.history.push('/home')}>login</button>
          <canvas ref={canvas} className={styles.canvas}></canvas>
        </div>
      </div>
    </div>
  )
}

export default Login
