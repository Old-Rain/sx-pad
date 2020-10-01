/**
 * 页面构建中
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface ConstructingProps {
  /**
   * 构建中的模块名称
   */
  moduleName: string
}

const Constructing: FC<ConstructingProps> = (props: PropsWithChildren<ConstructingProps>) => {
  return (
    <div className={styles.Constructing}>
      <div className={styles.notice}>{props.moduleName}页面正在构建中~</div>
    </div>
  )
}

export default Constructing
