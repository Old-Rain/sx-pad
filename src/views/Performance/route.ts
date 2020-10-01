import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const Performance = lazy(() => slowImport(import('./index')))

const routes: RouteC[] = [
  {
    name: '增员管理',
    path: '/performance',
    component: Performance,
  },
]

export default routes
