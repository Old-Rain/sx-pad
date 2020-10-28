import React, { useState, useRef, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import { useSelector, shallowEqual } from 'react-redux'
import { StoreModules } from '@/store/reducers'
import { CustomerOperationIndexCommon } from '@/store/modules/action/smartManageBoard/types'

import { selecGroupIndex, selecStaffIndex } from '@/api/action/smartManageBoard'
import { SelecGroupIndexData, SelecStaffIndexData } from '@/api/action/smartManageBoard/types'
import { Mark } from '@/api/action/smartManageBoard/types'
import { GroupIndex, StaffIndex } from './types'

import { message } from 'antd'

import styles from './index.module.scss'
import { fieldsMap } from './fieldsConfig'

interface NoticeOrdeProps {
  /**
   * 是否含有组内榜单
   */
  isStaffNoticeOrde?: boolean

  /**
   * 榜单类型
   */
  mark: Mark

  /**
   * 当前指标
   */
  currentIndex: CustomerOperationIndexCommon
}

// 榜单状态管理
interface NoticeOrdeState {
  /**
   * 全局时间
   */
  month: string

  /**
   * 当前指标
   */
  currentIndex: CustomerOperationIndexCommon

  /**
   * 组榜单排序
   */
  groupFlag: boolean

  /**
   * 组内业务员榜单排序
   */
  staffFlag: boolean

  /**
   * 当前组索引
   */
  groupCurrentIndex: number

  /**
   * 当前组id
   */
  groupCurrentId: string
}

const NoticeOrde: FC<NoticeOrdeProps> = (props: PropsWithChildren<NoticeOrdeProps>) => {
  // 看板全局时间
  const month = useSelector<StoreModules, string>(
    (state) => state.smartManageBoardModule.smartManageBoardMonth,
    shallowEqual,
  )

  // 左边列表ref
  const sortListLeftRef = useRef<HTMLDivElement>(null)

  // 右边表格滚动视口ref
  const rightScrollViewRef = useRef<HTMLDivElement>(null)

  // 入参
  const [state, setState] = useState<NoticeOrdeState>({
    month: month,
    currentIndex: props.currentIndex,
    groupFlag: true,
    staffFlag: true,
    groupCurrentIndex: 0,
    groupCurrentId: '',
  })

  // 入参ref
  const stateRef = useRef<NoticeOrdeState>(state)

  // 组列表
  const [groupList, setGroupList] = useState<GroupIndex[]>([])

  // 组内业务员列表
  const [staffList, setStaffList] = useState<StaffIndex[]>([])

  // 获取组榜单数据
  async function getGroupIndex() {
    const mark = props.mark
    const indexCode = stateRef.current.currentIndex?.indexCode

    if (!mark || !indexCode) {
      return
    }

    const params: SelecGroupIndexData = {
      indexType: '1',
      mark,
      indexCode,
      month: stateRef.current.month,
      groupFlag: stateRef.current.groupFlag,
    }

    const { data: res } = (await selecGroupIndex<GroupIndex[]>(params)) || { data: {} }

    // 请求失败
    if (!res || res.code !== '00') {
      message.error(res?.message || '未知错误')
      return
    }

    // 更新视图列表
    setGroupList(res.data)

    // 滚动高度回到0
    sortListLeftRef.current!.scrollTop = 0

    // 更新被选中的组
    stateRef.current.groupCurrentId = res.data[stateRef.current.groupCurrentIndex].groupId

    // mark 2 4 没有组内业务员榜单
    props.isStaffNoticeOrde && getStaffIndex()
  }

  // 获取组内业务员榜单数据
  async function getStaffIndex() {
    const mark = props.mark
    const indexCode = stateRef.current.currentIndex?.indexCode

    if (!mark || !indexCode) {
      return
    }

    const params: SelecStaffIndexData = {
      indexType: '1',
      mark,
      indexCode,
      month: stateRef.current.month,
      staffFlag: stateRef.current.staffFlag,
      groupId: stateRef.current.groupCurrentId,
    }

    const { data: res } = (await selecStaffIndex<StaffIndex[]>(params)) || { data: {} }

    // 请求失败
    if (!res || res.code !== '00') {
      message.error(res?.message || '未知错误')
      return
    }

    // 滚动高度回到0
    rightScrollViewRef.current!.scrollTop = 0

    setStaffList(res.data)
  }

  // 组榜单排序变化
  function groupSortChange() {
    setState((value) => {
      stateRef.current = {
        ...value,
        staffFlag: true, // 还原组内业务员榜单排序
        groupCurrentIndex: 0, // 还原选中的组

        // 更新组榜单排序
        groupFlag: !value.groupFlag,

        // 更新被选中的组
        groupCurrentId: groupList[0].groupId,
      }

      return stateRef.current
    })

    getGroupIndex()
  }

  // 组榜单选中变化
  function groupActivedChange(index: number) {
    setState((value) => {
      stateRef.current = {
        ...value,
        staffFlag: true, // 还原组内业务员榜单排序

        // 更新选中的组
        groupCurrentIndex: index,

        // 更新被选中的组
        groupCurrentId: groupList[index].groupId,
      }

      return stateRef.current
    })

    // mark 2 4 没有组内业务员榜单
    props.isStaffNoticeOrde && getStaffIndex()
  }

  // 组内业务员榜单排序变化
  function staffSortChange() {
    setState((value) => {
      stateRef.current = {
        ...value,

        // 更新组内业务员榜单排序
        staffFlag: !value.staffFlag,
      }

      return stateRef.current
    })

    getStaffIndex()
  }

  // 选中指标发生变化时
  useEffect(() => {
    setState((value) => {
      stateRef.current = {
        ...value,
        groupFlag: true, // 还原组榜单排序
        staffFlag: true, // 还原组内业务员榜单排序
        groupCurrentIndex: 0, // 还原选中的组

        // 更新选中的指标
        currentIndex: props.currentIndex,
      }

      return stateRef.current
    })

    getGroupIndex()

    // eslint-disable-next-line
  }, [props.currentIndex])

  return (
    <div className={styles.NoticeOrde}>
      {/* 组榜单排序 */}
      <button
        className={[styles.groupFlagBtn, styles.sort, state.groupFlag ? styles.sortUp : styles.sortDown].join(' ')}
        onClick={() => groupSortChange()}
      ></button>

      <div className={styles.sortListWrap}>
        {/* 左边列表项 */}
        <div className={styles.sortListLeft} ref={sortListLeftRef}>
          {groupList.map((item, index) => (
            <div
              key={index}
              className={[styles.leftItem, index === stateRef.current.groupCurrentIndex ? styles.actived : ''].join(
                ' ',
              )}
              onClick={() => groupActivedChange(index)}
            >
              {/* 名次 */}
              <div className={styles.leftItemRank}>
                {state.groupFlag ? (
                  // 升序
                  <>
                    {index <= 2 ? (
                      <i className={[styles.groupRankNo_, styles[`rankNo_${index + 1}`]].join(' ')}></i>
                    ) : (
                      index + 1
                    )}
                  </>
                ) : (
                  // 降序
                  <>
                    {index >= groupList.length - 3 ? (
                      <i className={[styles.groupRankNo_, styles[`rankNo_${groupList.length - index}`]].join(' ')}></i>
                    ) : (
                      groupList.length - index
                    )}
                  </>
                )}
              </div>

              {/* 信息 */}
              <div className={styles.leftItemInfo}>
                <p>{item.groupName}</p>
                <p>
                  {props.currentIndex.indexName}：{item[fieldsMap[props.mark - 1].valueFields]}
                  {item.indexUnit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 右边表格 */}
        {props.isStaffNoticeOrde ? (
          <div className={styles.sortListRight}>
            {/* 标题 */}
            <div className={styles.title}>
              <span>组内榜单</span>

              {/* 组内业务员榜单排序 */}
              <button
                className={[styles.staffFlagBtn, styles.sort, state.staffFlag ? styles.sortUp : styles.sortDown].join(
                  ' ',
                )}
                onClick={() => staffSortChange()}
              ></button>
            </div>

            {/*表格  */}
            <div className={styles.rightTable}>
              <div className={styles.rightScrollView} ref={rightScrollViewRef}>
                <table>
                  <thead>
                    <tr>
                      <th>排名</th>
                      <th>业务员</th>
                      <th>{props.currentIndex?.indexName}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {state.staffFlag ? (
                            // 升序
                            <>
                              {index <= 2 ? (
                                <i className={[styles.empRankNo_, styles[`rankNo_${index + 1}`]].join(' ')}></i>
                              ) : (
                                <i className={[styles.empRankNo_, styles.noRank].join(' ')}>{index + 1}</i>
                              )}
                            </>
                          ) : (
                            // 降序
                            <>
                              {index >= groupList.length - 4 ? (
                                <i
                                  className={[styles.empRankNo_, styles[`rankNo_${groupList.length - index - 1}`]].join(
                                    ' ',
                                  )}
                                ></i>
                              ) : (
                                <i className={[styles.empRankNo_, styles.noRank].join(' ')}>
                                  {groupList.length - index - 1}
                                </i>
                              )}
                            </>
                          )}
                        </td>
                        <td>{item.empName}</td>
                        <td>
                          {item[fieldsMap[props.mark - 1].valueFields]}
                          {item.indexUnit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NoticeOrde
