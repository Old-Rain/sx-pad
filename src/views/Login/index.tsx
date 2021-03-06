import React, { useEffect, useRef, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { CommonAction } from '@/store/reducers'
import { AUTH } from '@/store/modules/auth/actionTypes'

import QRCode from 'qrcode'
import { px2vw } from '@/utils/tools'
import { saveUserInfo } from '@/utils/userInfo'
import { UserInfo } from '@/utils/userInfo/types'

import { login, loginQRCode } from '@/api/login'

import { message, Form, Input } from 'antd'
import { RuleObject } from 'antd/lib/form'
import FormTab from './components/FormTab'
import FromTabItem from './components/FromTabItem'
import Puzzle, { PuzzleComfirm } from './components/Puzzle'

import styles from './index.module.scss'
import logo from '@/assets/logo.png'
import { bgList } from './bgList'

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

  // 获取二维码并渲染
  async function getQRCode() {
    const { data: res } = (await loginQRCode<string>()) || { data: null }

    if (!res || res.code !== '00') {
      setQrcodeStatus(0)
      return
    }

    setQrcodeStatus(1)

    QRCode.toCanvas(
      qrcodeCanvas.current, // 容器DOM
      `${res.data}_你还真扫啊_${Math.random()}`, // 数据信息
      { margin: 1, width: px2vw(180) }, // 边距、宽高
      function (error) {}, // 错误回调
    )

    // 二维码1分钟后过期
    qrcodeTimer.current = setTimeout(() => setQrcodeStatus(0), 60000)
  }

  // 二维码过期计时
  useEffect(() => {
    getQRCode()

    return () => {
      clearTimeout(Number(qrcodeTimer.current))
    }
  }, [])

  return (
    <div className={styles.LoginForQRCode}>
      <div className={styles.qrcode}>
        <canvas ref={qrcodeCanvas} className={styles.canvas}></canvas>
        <div className={styles.reload} style={{ display: qrcodeStatus ? 'none' : 'flex' }} onClick={getQRCode}>
          <i></i>
          <span>刷新</span>
        </div>
      </div>
      <p>请使用4.4.3及以上版本的游利宝扫码登录</p>
      <button>下载游利宝</button>
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

// 用户名校验
const usernameReg = /^(ex-|EX-)?([a-z]|[A-Z])+[0-9]{3}$/
const usernameRules = [
  {
    validator: function (rule: RuleObject, value: any) {
      if (usernameReg.test(value)) {
        return Promise.resolve()
      }
      return Promise.reject('请输入符合规则的UM用户名')
    },
  },
]

// 密码校验
const passwordReg = /^.{8,16}$/
const passwordRules = [
  {
    validator: function (rule: RuleObject, value: any) {
      if (passwordReg.test(value)) {
        return Promise.resolve()
      }
      return Promise.reject('请输入8~6位密码')
    },
  },
]

const LoginForUser: FC<LoginForUserProps> = (props: LoginForUserProps) => {
  const dispatch = useDispatch<Dispatch<CommonAction>>()
  
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
    const { data: res } = (await login<UserInfo>(values)) || { data: null }

    // 请求失败
    if (!res || res.code !== '00') {
      message.error(res?.message || '未知错误')
      setPuzzleVisible(false)

      return
    }

    // 保存用户信息
    saveUserInfo(res.data)

    // 更新权限
    dispatch({ type: AUTH.UPDATE_AUTH_LV })

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
          rules={usernameRules}
        >
          <Input placeholder="请输入UM用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          colon={false}
          validateTrigger="onBlur"
          label={<i className={styles.passwordIcon}></i>}
          rules={passwordRules}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
        <input type="submit" className={styles.submit} value="登 录" />
        <input type="button" className={styles.forgetPwd} value="忘记密码" />
      </Form>

      <Puzzle ref={puzzleRef} visible={puzzleVisible} bgList={bgList} enableSoup />
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
          <FormTab defaultActived={0}>
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
