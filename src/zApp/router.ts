import { ComponentClass, FC, LazyExoticComponent } from 'react'

import Action from '@/views/Action/route'

export interface RouteC {
  /**
   * 路径
   */
  path: string

  /**
   * 名称
   */
  name: string

  /**
   * 是否精确匹配
   */
  exact?: boolean

  /**
   * 组件
   */
  component: ComponentClass<any> | FC<any> | LazyExoticComponent<any>
}

interface RouterC {
  [propName: string]: RouteC[]
}

const routerC: RouterC = {
  auth0: [...Action],
}

export default routerC
