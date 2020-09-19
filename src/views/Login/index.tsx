import React, { useEffect, useRef, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import QRCode from 'qrcode'

import logo from '@/assets/logo.png'
import styles from './index.module.scss'

import FormTab from './components/FormTab'
import FromTabItem from './components/FromTabItem'

import { login as loginAPI, loginQRCode } from '@/api/login'
import { UserInfo } from '@/store/modules/user/types'

interface LoginProps extends RouteComponentProps {}

const Login: FC<LoginProps> = (props: PropsWithChildren<LoginProps>) => {
  //
  const [qrcodeStatus, setQrcodeStatus] = useState<0 | 1>(1)

  const qrcodeCanvas = useRef<HTMLCanvasElement>(null)

  const qrcodeTimer = useRef<NodeJS.Timeout | null>(null)

  // 二维码过期即时
  useEffect(() => {
    getQRCode()

    return () => {
      clearTimeout(Number(qrcodeTimer.current))
    }
  }, [])

  // 获取二维码并渲染
  async function getQRCode() {
    const { data: res } = await loginQRCode<string>()

    setQrcodeStatus(1)

    QRCode.toCanvas(
      qrcodeCanvas.current,
      `${res.data}${Math.random()}`,
      { width: (window.innerWidth * 180) / 1366 },
      function (error) {
        if (error) console.error(error)
        console.log('success!')
      },
    )

    // 二维码1分钟后过期
    qrcodeTimer.current = setTimeout(() => setQrcodeStatus(0), 60000)
  }

  // 账号密码登录
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
          <FormTab>
            <FromTabItem label="扫码登录">
              <div className={styles.qrcodeWrap}>
                <div className={styles.qrcode}>
                  <canvas ref={qrcodeCanvas} className={styles.canvas}></canvas>
                  <div
                    className={styles.reload}
                    style={{ display: qrcodeStatus ? 'none' : 'flex' }}
                    onClick={getQRCode}
                  >
                    <i></i>
                    <span>刷新</span>
                  </div>
                </div>
                <p>请使用5.15及以上版本的口袋e扫码登录</p>
                <button>下载口袋e</button>
              </div>
            </FromTabItem>
            <FromTabItem label="账号登录">
              <button onClick={login}>login</button>
            </FromTabItem>
          </FormTab>
        </div>
      </div>
    </div>
  )
}

export default Login
