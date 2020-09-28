/**
 * 侧栏菜单
 */
export interface Menu {
  name: string
  path?: string
  icon?: string
  children?: Menu[]
}

export interface Route {}
