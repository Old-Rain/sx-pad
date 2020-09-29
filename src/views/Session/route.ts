import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const Meeting = lazy(() => slowImport(import('./Meeting')))
const MissionCenter = lazy(() => slowImport(import('./MissionCenter')))

const routes: RouteC[] = [
  {
    path: '/Meeting',
    name: '行事历',
    component: Meeting,
  },
  {
    path: '/MissionCenter',
    name: '任务中心',
    component: MissionCenter,
  },
]

export default routes
