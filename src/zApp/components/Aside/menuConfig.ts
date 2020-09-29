/**
 * 菜单规则
 */
export interface MenuC {
  /**
   * 名称
   */
  name: string

  /**
   * 路径、唯一标识
   */
  path?: string

  /**
   * 图标（一级菜单用）
   */
  icon?: string

  /**
   * 子菜单
   */
  children?: MenuC[]
}

const auth1: MenuC[] = [{ name: '首页', path: '/home', icon: 'home' }]
const auth2: MenuC[] = [
  {
    name: '会议管理',
    path: '/session',
    icon: 'session',
    children: [
      { name: '行事例', path: '/meeting' },
      { name: '任务中心', path: '/missionCenter' },
    ],
  },
]
const auth6: MenuC[] = [
  {
    name: '活动管理',
    path: '/action',
    icon: 'action',
    children: [
      { name: '活动结果看板', path: '/interactiveTrack' },
      { name: '智慧经营看板', path: '/smartManageBoard' },
    ],
  },
]

export const menuConfig: { [propName: string]: MenuC[] } = { auth1, auth2, auth6 }
