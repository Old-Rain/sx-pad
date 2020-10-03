import request from '@/utils/request'
import { Res } from '@/api/types'
import { SelectDeptIndexData, SelecGroupIndexData, SelecStaffIndexData } from './types'

let baseURL = 'http://localhost:3002'

// 部门指标
export function selectDeptIndex<T>(data: SelectDeptIndexData) {
  return request<Res<T>>({
    url: `${baseURL}/mock/action/smartManageBoard/selectDeptIndex.json`,
    method: 'GET',
    data,
  })
}

// 指标下榜单组
export function selecGroupIndex<T>(data: SelecGroupIndexData) {
  return request<Res<T>>({
    url: `${baseURL}/mock/action/smartManageBoard/selectGroupIndex${data.mark}.json`,
    method: 'GET',
    data,
  })
}

// 榜单组内业务员
export function selecStaffIndex<T>(data: SelecStaffIndexData) {
  return request<Res<T>>({
    url: `${baseURL}/mock/action/smartManageBoard/selectStaffIndex${data.mark}.json`,
    method: 'GET',
    data,
  })
}
