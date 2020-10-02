import { put } from 'redux-saga/effects'
import store from '@/store'

import { SMART_MANAGE_BOARD } from './actionTypes'
import { SecondaryIndex, DeptIndexRes } from './types'
import { selectDeptIndex } from '@/api/action/smartManageBoard'
import { Res } from '@/api/types'

import { message } from 'antd'

interface SelectDeptIndex {
  areaId: string
  month: string
  deptIndexResList: DeptIndexRes[]
}

// 获取客户经营漏斗指标
export function* SMB__GET_DEPT_INDEX() {
  const { data: res }: { data: Res<SelectDeptIndex> } = yield selectDeptIndex<SelectDeptIndex>({
    indexType: '1',
    month: store.getState().smartManageBoardModule.smartManageBoardMonth,
  }) || { data: {} }

  // 请求失败
  if (!res || res.code !== '00') {
    message.error({ content: res?.message ?? '未知错误' })
    return
  }

  // 请求成功

  // 子指标实际排序
  let realIndex = 0

  // 子指标一维数组
  const secondaryIndexList: SecondaryIndex[] = []

  for (const iterator of res.data.deptIndexResList) {
    for (const iterator1 of iterator.secondaryIndexList) {
      iterator1.realIndex = realIndex++
      secondaryIndexList.push(iterator1)
    }
  }

  yield put({
    type: SMART_MANAGE_BOARD.UPDATE_DEPT_INDEX,
    value: {
      deptIndexResList: res.data.deptIndexResList,
      secondaryIndexList,
    },
  })
}
