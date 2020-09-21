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

/**
 * 扫码登录
 */
interface LoginForQRCodeProps extends RouteComponentProps {}

const LoginForQRCode: FC<LoginForQRCodeProps> = (props: LoginForQRCodeProps) => {
  // 二维码是否失效
  const [qrcodeStatus, setQrcodeStatus] = useState<0 | 1>(1)

  // 二维码canvas
  const qrcodeCanvas = useRef<HTMLCanvasElement>(null)

  // 二维码失效定时器
  const qrcodeTimer = useRef<NodeJS.Timeout | null>(null)

  // 二维码过期计时
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
  
  return (
    <div className={styles.LoginForQRCode}>
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
  )
}

/**
 * 账号登录
 */
interface LoginForUserProps extends RouteComponentProps {}

const LoginForUser: FC<LoginForUserProps> = (props: LoginForUserProps) => {
  async function login() {
    const { data: res } = await loginAPI<UserInfo>({ username: '', password: '' })
    console.log(res)
    props.history.push('/home')
  }

  return (
    <div className={styles.LoginForUser}>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.dir(e.target)
      }}>
        <input type="text" name="username" id=""/>
        <input type="password" name="password" />
        <button className={styles.submit}>登 录</button>
      </form>
    </div>
  )
}

/**
 * 登录界面
 */
interface LoginProps extends RouteComponentProps {}

const Login: FC<LoginProps> = (props: PropsWithChildren<LoginProps>) => {
  return (
    <div className={styles.Login}>
      <div className={styles.board}>
        {/* logo */}
        <h1>
          <img src={logo} alt="" />
        </h1>

        {/* 登录面板 */}
        <div className={styles.form}>
          <FormTab defaultActived={1}>
            <FromTabItem label="扫码登录">
              <LoginForQRCode {...props} />
            </FromTabItem>
            <FromTabItem label="账号登录">
              <LoginForUser {...props} />
            </FromTabItem>
          </FormTab>
        </div>
      </div>
    </div>
  )
}

export default Login
