import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const Performance = lazy(() => slowImport(import('./index')))

const routes: RouteC[] = [
  {
    path: '/performance',
    name: '增员管理',
    component: Performance,
  },
]

export default routes
