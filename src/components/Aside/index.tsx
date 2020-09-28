import React, { useState, useEffect, useRef, useMemo } from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'
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
  // 默认展开 组件有bug

  // 默认选中
  // eslint-disable-next-line
  const defaultKeys = useMemo(() => [`/${props.location.pathname.split('/')[1]}`], [])

  // 菜单列表
  const [menu, setMenu] = useState(getMenu())

  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  // to
  function to({ key }: MenuInfo) {
    props.history.push(key as string)
  }

  useEffect(() => {
    unsubscribe.current = store.subscribe(() => {
      setMenu(getMenu())
    })

    if (!menu.length) {
      store.dispatch({ type: AUTH.AUTH_UPDATE, value: true })
    }

    return () => {
      unsubscribe.current!()
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.Aside}>
      <Menu
        mode="inline"
        theme="dark"
        style={{ background: 'transparent' }}
        defaultSelectedKeys={defaultKeys}
        onClick={to}
      >
        {menu.map((item, index) => {
          return !item.children ? (
            <Menu.Item key={item.path} icon={<i className={[styles.menuIcon, styles[item.icon!]].join(' ')}></i>}>
              {item.name}
            </Menu.Item>
          ) : (
            <Menu.SubMenu
              key={`sub${index}`}
              icon={<i className={[styles.menuIcon, styles[item.icon!]].join(' ')}></i>}
              title={item.name}
              popupClassName={styles.subMenu}
            >
              {item.children!.map((item1, index1) => {
                return <Menu.Item key={item1.path}>{item1.name}</Menu.Item>
              })}
            </Menu.SubMenu>
          )
        })}
      </Menu>
    </div>
  )
}

export default withRouter(Aside)
