import { Menu } from './types'

export const menuConfig: {
  [propName: string]: Menu[]
} = {
  auth0: [
    {
      name: '首页',
      path: '/home',
    },
  ],
  auth6: [
    {
      name: '活动管理',
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
