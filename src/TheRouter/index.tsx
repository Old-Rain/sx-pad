import React, { useState, useCallback } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthLv } from '@/useDefinedHooks'
import { UseAuthLvFn } from '@/useDefinedHooks/useAuthLv'

import { routerConfig } from './routeConfig'
import { RouteC } from './routeConfig'

import NotFound from '@/components/NotFound'

interface TheRouterProps {}

const TheRouter: FC<TheRouterProps> = (props: PropsWithChildren<TheRouterProps>) => {
  // 路由
  const [routes, setRoutes] = useState<RouteC[]>([])

  // 监听用户权限等级回调函数缓存
  const authLvCallBack: UseAuthLvFn = useCallback<UseAuthLvFn>((lv) => updateRoutes(lv), [])

  // 监听用户权限等级，更新路由
  useAuthLv(authLvCallBack)

  // 更新路由
  function updateRoutes(lv: number) {
    const tempRoutes: RouteC[] = []

    for (let i = 0; i <= lv; i++) {
      tempRoutes.push(...(routerConfig[`auth${i}`] || []))
    }

    setRoutes(tempRoutes)
  }

  return (
    <Switch>
      {routes.map((item, index) => (
        <Route key={index} path={item.path} component={item.component} />
      ))}
      <Route path="*" exact component={NotFound} />
    </Switch>
  )
}

export default TheRouter
