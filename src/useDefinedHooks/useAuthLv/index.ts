/**
 * 创建用户权限等级
 */

import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { StoreModules } from '@/store/reducers'

export type UseAuthLvFn = (lv: number) => any

const useAuthLv = (fn?: UseAuthLvFn) => {
  const authLv = useSelector<StoreModules, number>(
    state => state.authModule.authLv,
    (left, right) => left === right,
  )

  useEffect(() => {
    fn?.(authLv)
  }, [authLv, fn])

  return authLv
}

export default useAuthLv
