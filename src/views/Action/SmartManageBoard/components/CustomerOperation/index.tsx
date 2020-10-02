/**
 * 客户经营漏斗
 */

import React, { useEffect, useState, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'
import { useHistory } from 'react-router-dom'
import { Unsubscribe } from 'redux'

import store from '@/store'
import { SMART_MANAGE_BOARD } from '@/store/modules/action/smartManageBoard/actionTypes'
import { DeptIndexRes } from '@/store/modules/action/smartManageBoard/types'
import { px2vw } from '@/utils/tools'

import LayoutCard from '@/components/LayoutCard'
import Inclined from '@/components/Inclined'

import styles from './index.module.scss'
import { primaryIndexConfigList, subIndexConfigList } from './colorConfig'

// 派发获取指标
function dispatchGetDeptIndexResList() {
  store.dispatch({ type: SMART_MANAGE_BOARD.GET_DEPT_INDEX })
}

// 从store获取指标
function getDeptIndexResList() {
  return store.getState().smartManageBoardModule.deptIndexResList
}

// 数据值格式化
function valFormat(val: string | null) {
  return !val || !+val ? '-' : val
}

// 人均实际值信号灯
function avgValueLight(avgValue: string | null, grandValue: string | null) {
  // 实际值和标杆值有存在空，不亮灯
  if (!avgValue || !+avgValue || !grandValue || !+grandValue) {
    return ''
  }

  // 实际值 < 标杆值，亮红灯
  if (+avgValue < +grandValue) {
    return 'red'
  }

  // 实际值 >= 标杆值，绿灯
  if (+avgValue >= +grandValue) {
    return 'green'
  }

  return ''
}

interface CustomerOperationProps {}

const CustomerOperation: FC<CustomerOperationProps> = (props: PropsWithChildren<CustomerOperationProps>) => {
  const history = useHistory()
  
  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  // 指标数据
  const [deptIndexResList, setDeptIndexResList] = useState<DeptIndexRes[]>(getDeptIndexResList())

  useEffect(() => {
    unsubscribe.current = store.subscribe(() => {
      setDeptIndexResList(getDeptIndexResList())
    })

    // 没有数据则派发申请
    if (!deptIndexResList.length) {
      dispatchGetDeptIndexResList()
    }

    return () => {
      unsubscribe.current!()
    }

    // eslint-disable-next-line
  }, [])

  // history.push('/action/smartManageBoard/CustomerOperationDetail')
  return (
    <div className={styles.CustomerOperation}>
      <LayoutCard extraClass={styles.card}>
        <div className={styles.iTable}>
          {/* 表头 */}
          <div className={styles.iTr}>
            <div className={styles.iTd}>主指标</div>
            <div className={styles.iTd}>当月累计值</div>
            <div className={styles.iTd}>人均实际值</div>
            <div className={styles.iTd}>人均标杆值</div>
            <div className={styles.iTd}>
              <div className={styles.iTdDWrap}>
                <div className={styles.iTdD}>子指标</div>
                <div className={styles.iTdD}>当月累计值</div>
                <div className={styles.iTdD}>人均实际值</div>
                <div className={styles.iTdD}>人均标杆值</div>
                <div className={styles.iTdD}></div>
              </div>
            </div>
          </div>

          {/* 身体 */}
          {deptIndexResList.map((item, index) => (
            <div className={styles.iTr} key={index}>
              {/* 主指标-名称 */}
              <div className={styles.iTd} style={{ background: primaryIndexConfigList[index].color }}>
                <button>{item.indexName}</button>
              </div>

              {/* 主指标-当月累计值 */}
              <div className={styles.iTd}>
                {valFormat(item.standardAvgValue)}

                {/* 累计潜客量历史累计 */}
                {item.indexCode === 'B' ? (
                  <div className={styles.history}>
                    <p>历史累计</p>
                    <p>{item.historyGrandValue}</p>
                  </div>
                ) : null}
              </div>

              {/* 主指标-人均实际值 */}
              <div className={styles.iTd}>
                {valFormat(item.avgValue)}
                <i className={[styles.light, styles[avgValueLight(item.avgValue, item.grandValue)]].join(' ')}></i>

                {/* 累计潜客量历史累计 */}
                {item.indexCode === 'B' ? (
                  <div className={styles.history}>
                    <p>历史累计</p>
                    <p>{item.historyAvgValue}</p>
                  </div>
                ) : null}
              </div>

              {/* 主指标-人均标杆值 */}
              <div className={styles.iTd}>{valFormat(item.grandValue)}</div>

              <div className={styles.iTd}>
                {item.secondaryIndexList.map((item1, index1) => (
                  <div className={styles.iTdDWrap} key={`${index}_${index1}`}>
                    {/* 子指标-名称 */}
                    <div className={styles.iTdD}>
                      <span
                        style={{
                          width: subIndexConfigList[item1.realIndex!].width,
                          background: subIndexConfigList[item1.realIndex!].color,
                        }}
                      >
                        {item1.indexName}
                        <Inclined
                          width={px2vw(6)}
                          height={px2vw(32)}
                          color={subIndexConfigList[item1.realIndex!].color}
                        />
                      </span>
                    </div>

                    {/* 子指标-当月累计值 */}
                    <div className={styles.iTdD}>{valFormat(item1.standardAvgValue)}</div>

                    {/* 子指标-人均实际值 */}
                    <div className={styles.iTdD}>
                      {valFormat(item1.avgValue)}
                      <i
                        className={[styles.light, styles[avgValueLight(item1.avgValue, item1.grandValue)]].join(' ')}
                      ></i>
                    </div>

                    {/* 子指标-人均标杆值 */}
                    <div className={styles.iTdD}>{valFormat(item1.grandValue)}</div>
                    <div className={styles.iTdD}>
                      <button>详情</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutCard>
    </div>
  )
}

export default CustomerOperation
