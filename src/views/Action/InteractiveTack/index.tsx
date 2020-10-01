/**
 * 活动结果看板
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface InteractiveTackProps {}

const InteractiveTack: FC<InteractiveTackProps> = (props: PropsWithChildren<InteractiveTackProps>) => {
  return (
    <div className={styles.InteractiveTack}>
      <Constructing moduleName="活动结果看板" />
    </div>
  )
}

export default InteractiveTack
