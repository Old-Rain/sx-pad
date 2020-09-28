import { Menu } from './types'

export const menuConfig: {
  [propName: string]: Menu[]
} = {
  auth0: [
    {
      name: '首页',
      path: '/home',
      icon: 'home',
    },
  ],
  auth2: [
    {
      name: '会议管理',
      path: '/session',
      icon: 'session',
      children: [
        {
          name: '行事例',
          path: '/meeting',
        },
        {
          name: '任务中心',
          path: '/missionCenter',
        },
      ],
    },
  ],
  auth6: [
    {
      name: '活动管理',
      path: '/action',
      icon: 'action',
      children: [
        {
          name: '活动结果看板',
          path: '/interactiveTrack',
        },
        {
          name: '智慧经营看板',
          path: '/smartManageBoard',
        },
      ],
    },
  ],
}
