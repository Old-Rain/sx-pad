import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const Home = lazy(() => slowImport(import('./index')))

const routes: RouteC[] = [
  {
    path: '/home',
    name: '首页',
    component: Home,
  },
]

export default routes
