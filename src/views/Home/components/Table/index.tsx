/**
 * 首页表格
 */

import React, { useRef, useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'

import { px2vw } from '@/utils/tools'
import { SecondaryRes } from '@/views/Home/types'

import styles from './index.module.scss'

interface TableProps {
  data: SecondaryRes[]
}

const Table: FC<TableProps> = (props: PropsWithChildren<TableProps>) => {
  // 滚动区域
  const scrollRef = useRef<HTMLDivElement>(null)

  // 滚动区域偏移量
  const [scrollOffsetLeft, setScrollOffsetLeft] = useState<number>(px2vw(720))

  const [shadow, setShadow] = useState<boolean>(true)

  useEffect(() => {
    setShadow(!!scrollOffsetLeft)
  }, [scrollOffsetLeft])

  useEffect(() => {
    scrollRef.current!.scrollLeft = px2vw(720)
  }, [])

  return (
    <div className={styles.Table}>
      {/* 固定区域 */}
      <div className={styles.fixedArea}>
        {/* 表头 */}
        <div className={[styles.fixedTr, styles.firstTr].join(' ')}>
          <div className={styles.fixedTd}>主要指标</div>
          <div className={styles.fixedTd}>
            <div className={styles.fixedTdDWrap}>
              <div className={styles.fixedTdD}>指标名称</div>
              <div className={styles.fixedTdD}>追踪频率</div>
            </div>
          </div>
        </div>

        {/* 身体 */}
        {props.data.map(({ secondaryName, emFieldIndicatorResList }, index) => (
          <div key={index} className={styles.fixedTr}>
            <div className={styles.fixedTd}>{secondaryName}</div>
            <div className={styles.fixedTd}>
              {emFieldIndicatorResList.map(({ realIndex, fieldIndicatorName }, index1) => (
                <div
                  key={`${index}_${index1}`}
                  className={[styles.fixedTdDWrap, realIndex! % 2 ? styles.tdDWrapEven : ''].join(' ')}
                >
                  <div className={styles.fixedTdD}>{fieldIndicatorName}</div>
                  <div className={styles.fixedTdD}>月</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 右侧投影 */}
        <div className={[styles.shadow, shadow ? styles.show : ''].join(' ')}></div>
      </div>

      {/* 横向滚动区域 */}
      <div
        className={styles.scrollArea}
        ref={scrollRef}
        onScroll={(e) => setScrollOffsetLeft((e.target as HTMLDivElement).scrollLeft)}
      >
        {/* 滚动区域视口 */}
        <div className={styles.scrollView}>
          {/* 表头 */}
          <div className={[styles.scrollTr, styles.firstTr].join(' ')}>
            <div className={styles.scrollTd}>
              <div className={styles.scrollTdDWrap}>
                {props.data[0]?.emFieldIndicatorResList[0]?.fieldDataList?.map((item, index) => (
                  <div className={styles.scrollTdD} key={index}>
                    {item.trackTime}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 身体 */}
          {props.data.map(({ emFieldIndicatorResList }, index) => (
            <div className={styles.scrollTr} key={index}>
              <div className={styles.scrollTd}>
                {emFieldIndicatorResList.map(({ fieldDataList, realIndex }, index1) => (
                  <div
                    className={[styles.scrollTdDWrap, realIndex! % 2 ? styles.tdDWrapEven : ''].join(' ')}
                    key={`${index}_${index1}`}
                  >
                    {fieldDataList.map(({ actualValue, indexUtil }, index2) => (
                      <div className={styles.scrollTdD} key={index2}>
                        {!actualValue ? (
                          '-'
                        ) : (
                          <>
                            {indexUtil === '%' ? (+actualValue).toFixed(2) : actualValue}
                            {indexUtil}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Table
