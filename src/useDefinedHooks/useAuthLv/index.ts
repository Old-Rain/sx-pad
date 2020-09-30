/**
 * 创建用户权限等级
 */

import { useState, useEffect, useRef } from 'react'
import { Unsubscribe } from 'redux'
import store from '@/store'

// 获取用户权限等级
function getAuthLv() {
  return store.getState().authModule.authLv
}

export type UseAuthLvFn = (lv: number) => any

const useAuthLv = (fn: UseAuthLvFn) => {
  // 用户权限等级
  const [authLv, setAuthLv] = useState<number>(getAuthLv())

  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  useEffect(() => {
    // 监听store 更新用户权限等级
    unsubscribe.current = store.subscribe(() => {
      setAuthLv(getAuthLv())
    })

    return () => {
      unsubscribe.current!()
    }
  }, [])

  useEffect(() => {
    fn(authLv)
  }, [authLv, fn])

  return authLv
}

export default useAuthLv
