/**
 * 监听页面url变化
 */

import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Location, Action, UnregisterCallback } from 'history'

export interface UseListenerURL {
  (cb: (listener: Location, action: Action) => any): void
}

const useListenerURL: UseListenerURL = (cb) => {
  const history = useHistory<{}>()

  // 卸载url监听
  const unregisterCallback = useRef<UnregisterCallback>()

  useEffect(() => {
    // 监听url变化 更新当前选中的菜单项
    unregisterCallback.current = history.listen((listener, action) => {
      cb(listener, action)
    })

    return () => {
      unregisterCallback.current!()
    }

    // eslint-disable-next-line
  }, [])
}

export default useListenerURL
