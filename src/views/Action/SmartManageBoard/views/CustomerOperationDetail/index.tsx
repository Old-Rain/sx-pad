/**
 * 客户经营漏斗详情页
 */

import React, { useState, useEffect, useMemo } from 'react'
import { FC, PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

import { useSelector, shallowEqual } from 'react-redux'
import { StoreModules } from '@/store/reducers'
import { SmartManageBoardState } from '@/store/modules/action/smartManageBoard'
import { CustomerOperationIndexCommon } from '@/store/modules/action/smartManageBoard/types'

import useAutoIndex from '@/views/Action/SmartManageBoard/useDefinedHooks/useAutoIndex'
import { px2vw } from '@/utils/tools'
import { CustomerOperationDetailInfo } from './types'

import { Tabs } from 'antd'
import CrumbsLv2 from '@/components/CrumbsLv2'
import CardTitle from '@/components/CardTitle'
import TheDatePicker from '@/views/Action/SmartManageBoard/components/TheDatePicker'
import NoticeOrde from './components/NoticeOrde'

import styles from './index.module.scss'

// 小卡片内容格式
type IndexValKey = 'standardAvgValue' | 'avgValue' | 'grandValue' | 'historyGrandValue' | 'historyAvgValue'
const smallValueFormat = (indexItem: CustomerOperationIndexCommon, valKey: IndexValKey) => {
  const val = indexItem ? indexItem[valKey] : ''
  if (!val || !+val) {
    return <span className={styles.big}>-</span>
  }

  return (
    <span className={styles.big}>
      {val}
      <span className={styles.unit}>{indexItem.indexUnit}</span>
    </span>
  )
}

interface CustomerOperationDetailProps {}

const CustomerOperationDetail: FC<CustomerOperationDetailProps> = (
  props: PropsWithChildren<CustomerOperationDetailProps>,
) => {
  const location = useLocation<CustomerOperationDetailInfo>()

  // store智慧经营看板数据
  const smartManageBoardModule = useSelector<StoreModules, SmartManageBoardState>(
    (state) => state.smartManageBoardModule,
    shallowEqual,
  )
  
  // 当前激活的tabs
  const [activeKey, setActiveKey] = useState<string>('1')

  // 指标类型
  const indexType = location.state?.indexType || '主指标'

  // 指标列表索引
  const indexKey = location.state?.indexKey || 'deptIndexResList'

  // 指标列表
  const indexList = useMemo(
    () => (smartManageBoardModule as any)[indexKey] as CustomerOperationIndexCommon[],
    [smartManageBoardModule, indexKey]
  )

  // 指标编号
  const [indexCode, setIndexCode] = useState<string>(location.state?.indexCode || 'A')

  // 指标索引
  const [indexIndex, setIndexIndex] = useState<number>(location.state?.indexIndex || 0)

  useEffect(() => {
    setActiveKey('1')
  }, [indexIndex])

  // 自动获取指标
  useAutoIndex()

  return (
    <div className={styles.CustomerOperationDetail}>
      {/* 头部 */}
      <div className={styles.header}>
        <CrumbsLv2 from="客户经营漏斗">{indexType}详情</CrumbsLv2>
        <TheDatePicker />
      </div>

      {/* 身体 */}
      <div className={styles.body}>
        {/* 左边指标列表 */}
        <div className={styles.bodyLeft}>
          <CardTitle title={indexType} />
          <div className={styles.indexList}>
            {indexList.map((item, index) => (
              <div
                key={index}
                className={[styles.indexItem, index === indexIndex ? styles.indexItemActived : ''].join(' ')}
                style={{ width: px2vw(302 - index * 12) }}
                onClick={() => {
                  setIndexCode(item.indexCode)
                  setIndexIndex(index)
                }}
              >
                {item.indexName}
              </div>
            ))}
          </div>
        </div>

        {/* 中间渐变 */}
        <div className={styles.bodyMiddle}></div>

        {/* 右边指标详情 */}
        <div className={styles.bodyRight}>
          <CardTitle title={indexList[indexIndex]?.indexName ?? ''} />

          {/* 小卡片 */}
          <div className={styles.smallCardGroup}>
            <div className={styles.smallCard}>
              <p>{smallValueFormat(indexList[indexIndex], 'standardAvgValue')}</p>
              <p>当月累计</p>
            </div>
            <div className={styles.smallCard}>
              <p>{smallValueFormat(indexList[indexIndex], 'avgValue')}</p>
              <p>人均实际值</p>
            </div>
            <div className={styles.smallCard}>
              <p>{smallValueFormat(indexList[indexIndex], 'grandValue')}</p>
              <p>人均标杆值</p>
            </div>

            {/* 累计潜客量多两个值 */}
            {indexCode === 'B' ? (
              <>
                <div className={styles.smallCard}>
                  <p>{smallValueFormat(indexList[indexIndex], 'historyGrandValue')}</p>
                  <p>历史累计</p>
                </div>
                <div className={styles.smallCard}>
                  <p>{smallValueFormat(indexList[indexIndex], 'historyAvgValue')}</p>
                  <p>历史累计（人均）</p>
                </div>
              </>
            ) : null}
          </div>

          {/* 榜单 */}
          <CardTitle title="榜单" extraTitleClass={styles.noticeOrdeTitle} />
          <Tabs activeKey={activeKey} onChange={(activeKey) => setActiveKey(activeKey)}>
            <Tabs.TabPane tab="当月累计" key="1">
              <NoticeOrde isStaffNoticeOrde mark={1} currentIndex={indexList[indexIndex]} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="人均实际值" key="2">
              <NoticeOrde mark={2} currentIndex={indexList[indexIndex]} />
            </Tabs.TabPane>

            {/* 累计潜客量多两个榜单 */}
            {indexCode === 'B' ? (
              <>
                <Tabs.TabPane tab="历史累计" key="3">
                  <NoticeOrde isStaffNoticeOrde mark={3} currentIndex={indexList[indexIndex]} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="历史累计（人均）" key="4">
                  <NoticeOrde mark={4} currentIndex={indexList[indexIndex]} />
                </Tabs.TabPane>
              </>
            ) : null}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CustomerOperationDetail
