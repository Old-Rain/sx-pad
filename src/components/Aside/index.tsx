import React from 'react'
import { FC, PropsWithChildren } from 'react'

import { Menu } from 'antd'

import styles from './index.module.scss'

const { SubMenu } = Menu

interface AsideProps {}

const Aside: FC<AsideProps> = (props: PropsWithChildren<AsideProps>) => {
  return (
    <div className={styles.Aside}>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
        {/* <Menu.Item key="1" icon={1}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={2}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={3}>
          Option 3
        </Menu.Item> */}
        {/* <SubMenu key="sub1" icon={4} title="Navigation One">
          <Menu.Item key="5">Option 9</Menu.Item>
          <Menu.Item key="6">Option 10</Menu.Item>
          <SubMenu key="sub4" title="Submenu">
            <Menu.Item key="7">Option 11</Menu.Item>
            <Menu.Item key="8">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu> */}
        <SubMenu key="sub2" icon={5} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub5" icon={9} title="Navigation Two">
          <Menu.Item key="100">Option 9</Menu.Item>
          <Menu.Item key="10000">Option 10</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default Aside
