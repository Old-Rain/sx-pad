import React, { useState, useEffect, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
import { UnregisterCallback } from 'history'
import { Unsubscribe } from 'redux'
import store from '@/store'
import { AUTH } from '@/store/modules/auth/actionTypes'

import { Menu } from 'antd'
import { MenuInfo } from 'rc-menu/es/interface'

import styles from './index.module.scss'

// 获取菜单
function getMenu() {
  return store.getState().authModule.menu
}

interface AsideProps extends RouteComponentProps {}

const Aside: FC<AsideProps> = (props: PropsWithChildren<AsideProps>) => {
  // 菜单列表
  const [menu, setMenu] = useState(getMenu())

  // 当前选中的菜单项
  const [selectedKeys, setSelectedKeys] = useState([`/${props.location.pathname.split('/')[1]}`])

  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  // 卸载router监听
  const unrouter = useRef<UnregisterCallback>()

  // 点击菜单项
  function clickMenuItem({ key }: MenuInfo) {
    if (props.location.pathname === key) return

    props.history.push(key as string)
  }

  useEffect(() => {
    // 监听store 更新菜单列表
    unsubscribe.current = store.subscribe(() => {
      setMenu(getMenu())
    })

    // 监听路由变化 更新当前选中的菜单项
    unrouter.current = props.history.listen((listener) => {
      setSelectedKeys([`/${listener.pathname.split('/')[1]}`])
    })

    // 菜单为空尝试获取一次（针对刷新之后）
    if (!menu.length) {
      store.dispatch({ type: AUTH.AUTH_UPDATE, value: true })
    }

    return () => {
      unsubscribe.current!()
      unrouter.current!()
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.Aside}>
      <Menu
        mode="inline"
        theme="dark"
        style={{ background: 'transparent' }}
        selectedKeys={selectedKeys}
        onClick={clickMenuItem}
      >
        {menu.map((item, index) => {
          return !item.children ? (
            <Menu.Item key={item.path} icon={<i className={[styles.menuIcon, styles[item.icon!]].join(' ')}></i>}>
              {item.name}
            </Menu.Item>
          ) : (
            <Menu.SubMenu
              key={item.path}
              icon={<i className={[styles.menuIcon, styles[item.icon!]].join(' ')}></i>}
              title={item.name}
              popupClassName={styles.subMenu}
            >
              {item.children!.map((item1, index1) => {
                return <Menu.Item key={`${item1.path}`}>{item1.name}</Menu.Item>
              })}
            </Menu.SubMenu>
          )
        })}
      </Menu>
    </div>
  )
}

export default withRouter(Aside)
