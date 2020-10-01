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
      { name: '行事历', path: '/session/meeting' },
      { name: '任务中心', path: '/session/missionCenter' },
    ],
  },
]
const auth6: MenuC[] = [
  {
    name: '活动管理',
    path: '/action',
    icon: 'action',
    children: [
      { name: '活动结果看板', path: '/action/interactiveTrack' },
      { name: '智慧经营看板', path: '/action/smartManageBoard' },
    ],
  },
]

const auth8: MenuC[] = [
  {
    name: '增员管理',
    path: '/addMember',
    icon: 'addMember',
  },
]

const auth10: MenuC[] = [
  {
    name: '个人绩效',
    path: '/performance',
    icon: 'performance',
  },
]

export const menuConfig: { [propName: string]: MenuC[] } = { auth1, auth2, auth6, auth8, auth10 }
