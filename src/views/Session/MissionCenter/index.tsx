/**
 * 任务中心
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface MissionCenterProps {}

const MissionCenter: FC<MissionCenterProps> = (props: PropsWithChildren<MissionCenterProps>) => {
  return (
    <div className={styles.MissionCenter}>
      <Constructing moduleName="任务中心" />
    </div>
  )
}

export default MissionCenter
