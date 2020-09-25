import React, { useState } from 'react'
import { FC, PropsWithChildren, ReactElement } from 'react'

import styles from './index.module.scss'

import { FromTabItemProps } from '../FromTabItem'

interface FormTabProps {
  /**
   * 默认选中的页签
   */
  defaultActived?: number

  children: ReactElement<FromTabItemProps>[] // 子属性必须为FromTabItem组件（虽然不用FromTabItemProps也不会报错，但是这样写有提示）
}

const FormTab: FC<FormTabProps> = (props: PropsWithChildren<FormTabProps>) => {
  const [actived, setActived] = useState<number>(props.defaultActived || 0)

  return (
    <div className={styles.FormTab}>
      {/* tab栏 */}
      <div className={styles.tabs}>
        {props.children.map((item, index) => (
          <div key={index} className={[styles.tab, actived === index ? styles.active : ''].join(' ')}>
            <span onClick={() => setActived(index)}>{item.props.label}</span>
          </div>
        ))}
      </div>

      {/* 内容 */}
      <div className={styles.tabItem}>
        {props.children.map((item, index) => (
          <div key={index} style={{ display: actived === index ? 'block' : 'none' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormTab
