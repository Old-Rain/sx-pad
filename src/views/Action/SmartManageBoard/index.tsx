/**
 * 智慧经营看板
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import { Tabs } from 'antd'
import Layout from '@/components/Layout'
import TheDatePicker from './components/TheDatePicker'
import CustomerOperation from './components/CustomerOperation'
import CustomerAction from './components/CustomerAction'

import styles from './index.module.scss'

interface SmartManageBoardProps {}

const SmartManageBoard: FC<SmartManageBoardProps> = (props: PropsWithChildren<SmartManageBoardProps>) => {
  return (
    <div className={styles.SmartManageBoard}>
      <Layout extraClass={styles.title}>
        <h2>智慧经营看板</h2>

        <TheDatePicker extraClass={styles.theDatePicker} />
      </Layout>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="客户经营漏斗" key="1">
          <CustomerOperation />
        </Tabs.TabPane>
        <Tabs.TabPane tab="客户活动结果" key="2">
          <CustomerAction />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default SmartManageBoard
