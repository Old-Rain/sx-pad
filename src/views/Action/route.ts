import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const SmartManageBoard = lazy(() => slowImport(import('./SmartManageBoard')))
const CustomerOperationDetail = lazy(() => slowImport(import('./SmartManageBoard/views/CustomerOperationDetail')))
const InteractiveTack = lazy(() => slowImport(import('./InteractiveTack')))

const routes: RouteC[] = [
  {
    name: '智慧经营看板',
    exact: true,
    path: '/action/smartManageBoard',
    component: SmartManageBoard,
  },
  {
    name: '客户经营漏斗详情',
    path: '/action/smartManageBoard/CustomerOperationDetail',
    component: CustomerOperationDetail,
  },
  {
    name: '活动结果看板',
    path: '/action/interactiveTrack',
    component: InteractiveTack,
  },
]

export default routes
