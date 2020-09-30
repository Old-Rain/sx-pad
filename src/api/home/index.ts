import request from '@/utils/request'
import { Res } from '@/api/types'

let baseURL = 'http://localhost:3002'

// 获取最近半年的数据
export function deptCoreIndexByHalfYear<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/home/deptCoreIndexByHalfYear.json`,
    method: 'GET',
  })
}

// 获取最近1年的数据
export function deptCoreIndexByYear<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/home/deptCoreIndexByYear.json`,
    method: 'GET',
  })
}
