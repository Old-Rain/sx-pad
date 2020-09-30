import { ComponentType, ComponentClass, FC, LazyExoticComponent } from 'react'

import Home from '@/views/Home/route'
import Session from '@/views/Session/route'
import Action from '@/views/Action/route'
import AddMember from '@/views/AddMember/route'
import Performance from '@/views/Performance/route'

/**
 * 路由规则
 */
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

// 延迟加载，查看交互效果
type LazyComponent = Promise<{ default: ComponentType }>
export function slowImport(value: LazyComponent, ms = 300): LazyComponent {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

const auth1: RouteC[] = Home
const auth2: RouteC[] = Session
const auth6: RouteC[] = Action
const auth8: RouteC[] = AddMember
const auth10: RouteC[] = Performance

export const routerConfig: { [propName: string]: RouteC[] } = { auth1, auth2, auth6, auth8, auth10 }
export const fullRoute = [...auth1, ...auth2, ...auth6, ...auth8, ...auth10]
