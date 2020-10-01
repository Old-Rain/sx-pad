/**
 * 个人绩效
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface PerformanceProps {}

const Performance: FC<PerformanceProps> = (props: PropsWithChildren<PerformanceProps>) => {
  return <div className={styles.Performance}>
    <Constructing moduleName="个人绩效" />
  </div>
}

export default Performance
