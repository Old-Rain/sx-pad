/**
 * 自动获取指标
 */

import { useEffect, useRef } from 'react'
import { Unsubscribe } from 'redux'

import store from '@/store'
import { SMART_MANAGE_BOARD } from '@/store/modules/action/smartManageBoard/actionTypes'

// 派发获取指标
export function dispatchGetDeptIndexResList() {
  store.dispatch({ type: SMART_MANAGE_BOARD.GET_DEPT_INDEX })
}

// 从store获取指标
export function getDeptIndexResList() {
  return store.getState().smartManageBoardModule.deptIndexResList
}

export type UseAutoIndexFn = () => any

const useAutoIndex = (fn: UseAutoIndexFn) => {
  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  useEffect(() => {
    unsubscribe.current = store.subscribe(() => {
      fn()
    })

    // 没有数据则派发申请
    if (!getDeptIndexResList().length) {
      dispatchGetDeptIndexResList()
    }

    return () => {
      unsubscribe.current!()
    }
  }, [fn])
}

export default useAutoIndex
