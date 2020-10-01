import { lazy } from 'react'
import { slowImport } from '@/TheRouter/routeConfig'
import { RouteC } from '@/TheRouter/routeConfig'

const Meeting = lazy(() => slowImport(import('./Meeting')))
const MissionCenter = lazy(() => slowImport(import('./MissionCenter')))

const routes: RouteC[] = [
  {
    name: '行事历',
    path: '/session/Meeting',
    component: Meeting,
  },
  {
    name: '任务中心',
    path: '/session/MissionCenter',
    component: MissionCenter,
  },
]

export default routes
