import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const InteractiveTack = lazy(() => slowImport(import('./InteractiveTack')))
const SmartManageBoard = lazy(() => slowImport(import('./SmartManageBoard')))

const routes: RouteC[] = [
  {
    path: '/interactiveTrack',
    name: '活动结果看板',
    component: InteractiveTack,
  },
  {
    path: '/smartManageBoard',
    name: '智慧经营看板',
    component: SmartManageBoard,
  },
]

export default routes
