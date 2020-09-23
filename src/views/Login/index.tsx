import React, { useEffect, useRef, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import QRCode from 'qrcode'

import { Form, Input } from 'antd'
import FormTab from './components/FormTab'
import FromTabItem from './components/FromTabItem'
import Puzzle, { PuzzleComfirm } from './components/Puzzle'

import logo from '@/assets/logo.png'
import styles from './index.module.scss'

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
        <div className={styles.reload} style={{ display: qrcodeStatus ? 'none' : 'flex' }} onClick={getQRCode}>
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

interface UserForm {
  username: string
  password: string
}

const usernameReg = /^(ex-|EX-)?([a-z]|[A-Z])+[0-9]{3}$/
const passwordReg = /^.{8,16}$/

const LoginForUser: FC<LoginForUserProps> = (props: LoginForUserProps) => {
  const [form] = Form.useForm<UserForm>()
  const [puzzleVisible, setPuzzleVisible] = useState<boolean>(false)
  const puzzleRef = useRef<PuzzleComfirm>(null)

  const onFinish = async (values: UserForm) => {
    // 显示拼图
    setPuzzleVisible(true)

    // 拼图校验
    const puzzleRes = await puzzleRef.current!.comfirm().catch(() => {})

    // 取消校验
    if (!puzzleRes) return setPuzzleVisible(false)

    // 校验通过发送请求
    const { data: res } = await loginAPI<UserInfo>({ username: '', password: '' })
    console.log(res)
    props.history.push('/home')
  }

  return (
    <div className={styles.LoginForUser}>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{ username: 'ex-lidongyou002', password: '123456789' }}
      >
        <Form.Item
          name="username"
          colon={false}
          validateTrigger="onBlur"
          label={<i className={styles.usernameIcon}></i>}
          rules={[
            {
              validator: function (rule, value) {
                if (usernameReg.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject('请输入符合规则的UM用户名')
              },
            },
          ]}
        >
          <Input placeholder="请输入UM用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          colon={false}
          validateTrigger="onBlur"
          label={<i className={styles.passwordIcon}></i>}
          rules={[
            {
              validator: function (rule, value) {
                if (passwordReg.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject('请输入8~6位密码')
              },
            },
          ]}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
        <input type="submit" className={styles.submit} value="登 录" />
        <input type="button" className={styles.forgetPwd} value="忘记密码" />
      </Form>

      <Puzzle ref={puzzleRef} visible={puzzleVisible} />
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
