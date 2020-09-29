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

const useAuthLv = () => {
  // 用户权限等级
  const [authLv, setAuthLv] = useState<number>(getAuthLv())

  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  useEffect(() => {
    // 监听store 更新菜单列表
    unsubscribe.current = store.subscribe(() => {
      setAuthLv(getAuthLv())
    })

    return () => {
      unsubscribe.current!()
    }

    // eslint-disable-next-line
  }, [])

  return authLv
}

export default useAuthLv
