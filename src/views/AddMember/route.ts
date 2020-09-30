import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const AddMember = lazy(() => slowImport(import('./index')))

const routes: RouteC[] = [
  {
    path: '/addMember',
    name: '增员管理',
    component: AddMember,
  },
]

export default routes
