/**
 * 客户经营漏斗
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { useSelector, shallowEqual } from 'react-redux'
import { StoreModules } from '@/store/reducers'
import { DeptIndexRes } from '@/store/modules/action/smartManageBoard/types'

import useAutoIndex from '@/views/Action/SmartManageBoard/useDefinedHooks/useAutoIndex'
import { px2vw } from '@/utils/tools'
import { CustomerOperationDetailInfo } from '@/views/Action/SmartManageBoard/views/CustomerOperationDetail/types'

import LayoutCard from '@/components/LayoutCard'
import Inclined from '@/components/Inclined'

import styles from './index.module.scss'
import { primaryIndexConfigList, subIndexConfigList } from './colorConfig'

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
  const match = useRouteMatch()

  const deptIndexResList = useSelector<StoreModules, DeptIndexRes[]>(
    state => state.smartManageBoardModule.deptIndexResList,
    shallowEqual,
  )

  // 转到详情页
  function toDetail(value: CustomerOperationDetailInfo) {
    history.push({
      pathname: `${match.path}/customerOperationDetail`,
      state: { ...value },
    })
  }

  // 自动获取指标
  useAutoIndex()

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
                <button
                  onClick={() =>
                    toDetail({
                      indexType: '主指标',
                      indexCode: item.indexCode,
                      indexKey: 'deptIndexResList',
                      indexIndex: index,
                    })
                  }
                >
                  {item.indexName}
                </button>
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
                      <button
                        onClick={() =>
                          toDetail({
                            indexType: '子指标',
                            indexCode: item1.indexCode,
                            indexKey: 'secondaryIndexList',
                            indexIndex: item1.realIndex!,
                          })
                        }
                      >
                        详情
                      </button>
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
