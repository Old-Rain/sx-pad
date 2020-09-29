import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import { useAuthLv, useListenerURL } from '@/useDefinedHooks'

import styles from './index.module.scss'
import { menuConfig } from './menuConfig'
import { MenuC } from './menuConfig'

import { Menu } from 'antd'
import { MenuInfo } from 'rc-menu/es/interface'

interface AsideProps extends RouteComponentProps {}

const Aside: FC<AsideProps> = (props: PropsWithChildren<AsideProps>) => {
  // 用户权限等级
  const authLv = useAuthLv()

  // 菜单列表
  const [menu, setMenu] = useState<MenuC[]>([])

  // 当前选中的菜单项
  const [selectedKeys, setSelectedKeys] = useState([`/${props.location.pathname.split('/')[1]}`])

  // url变化时更新选中的菜单项
  useListenerURL((listener) => setSelectedKeys([`/${listener.pathname.split('/')[1]}`]))

  // 更新菜单
  function updateMenu(lv: number) {
    const tempMenu: MenuC[] = []

    for (let i = 0; i <= lv; i++) {
      tempMenu.push(...(menuConfig[`auth${i}`] || []))
    }

    setMenu(tempMenu)
  }

  // 点击菜单项
  function clickMenuItem({ key }: MenuInfo) {
    if (props.location.pathname === key) return

    props.history.push(key as string)
  }

  // 监听用户权限等级，更新菜单
  useEffect(() => {
    updateMenu(authLv)
  }, [authLv])

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
