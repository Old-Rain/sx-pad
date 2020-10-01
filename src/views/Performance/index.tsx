import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import { Button, Menu, Dropdown } from 'antd'

import styles from './index.module.scss'

const Menuuu = () => {
  useEffect(() => {
    console.log(123)
  })

  return (
    <Menu>
      <Menu.ItemGroup title="Group title">
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
      </Menu.ItemGroup>
      <Menu.SubMenu title="sub menu">
        <Menu.Item>3rd menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="disabled sub menu" disabled>
        <Menu.Item>5d menu item</Menu.Item>
        <Menu.Item>6th menu item</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

const DropdownMenu = () => {
  return (
    <Dropdown overlay={<Menuuu />}>
      <div>我是锤子</div>
    </Dropdown>
  )
}

const AsideBar = () => {
  const [collapsed, setCollapsed] = useState(false)

  function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? () => <span>开</span> : () => <span>关</span>)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<span>A</span>}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<span>B</span>}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<span>C</span>}>
          Option 3
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<span>D</span>} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<span>E</span>} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

interface AddMemberProps {}

const AddMember: FC<AddMemberProps> = (props: PropsWithChildren<AddMemberProps>) => {
  return (
    <div className={styles.AddMember}>
      <AsideBar />
      {/* <DropdownMenu /> */}
    </div>
  )
}

export default AddMember
