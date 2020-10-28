/**
 * 自动获取指标
 */

import { useEffect } from 'react'

import { Dispatch } from 'redux'
import { useStore, useDispatch } from 'react-redux'
import { StoreModules, CommonAction } from '@/store/reducers'
import { SMART_MANAGE_BOARD } from '@/store/modules/action/smartManageBoard/actionTypes'

const useAutoIndex = () => {
  const store = useStore<StoreModules>()
  
  const dispatch = useDispatch<Dispatch<CommonAction>>()

  const deptIndexResList = store.getState().smartManageBoardModule.deptIndexResList

  useEffect(() => {
    // 没有数据则派发申请
    if (!deptIndexResList.length) {
      dispatch({ type: SMART_MANAGE_BOARD.GET_DEPT_INDEX })
    }

    // eslint-disable-next-line
  }, [])
}

export default useAutoIndex
