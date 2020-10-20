/**
 * 活动结果看板
 */

import React, { useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import { Dispatch } from 'redux'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Modules, CommonAction } from '@/store/reducers'
import { AuthState } from '@/store/modules/auth'
import { AUTH } from '@/store/modules/auth/actionTypes'

import { updateUserInfo } from '@/utils/userInfo'

// import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface InteractiveTackProps {}

const InteractiveTack: FC<InteractiveTackProps> = (props: PropsWithChildren<InteractiveTackProps>) => {
  const dispatch = useDispatch<Dispatch<CommonAction>>()

  const authModule = useSelector<Modules, AuthState>(
    (state) => {
      // console.log('state', state)

      return state.authModule
    },

    // 自带的浅比较
    shallowEqual,

    // 手动比较
    // (left, right) => {
    //   console.log('left', 'right')
    //   console.log(left === right)
    //   console.log(left, right)

    //   // true则表示不进行更新
    //   return left.authLv === right.authLv
    // },
  )

  useEffect(() => {
    console.log('把昨天都作废')

    return () => {
      console.log('重新渲染会执行我')
    }
  })

  return (
    <div className={styles.InteractiveTack}>
      {/* <Constructing moduleName="活动结果看板" /> */}
      <button onClick={() => console.log(authModule)}>打印authModule</button>
      <div>用户权限等级{authModule.authLv}</div>
      <button
        onClick={() => {
          updateUserInfo(authModule.authLv + 1)
          dispatch({ type: AUTH.UPDATE_AUTH_LV })
        }}
      >
        改变权限等级+
      </button>
      <button
        onClick={() => {
          updateUserInfo(authModule.authLv - 1)
          dispatch({ type: AUTH.UPDATE_AUTH_LV })
        }}
      >
        改变权限等级-
      </button>
    </div>
  )
}

export default InteractiveTack
