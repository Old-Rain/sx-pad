import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface MissionCenterProps {}

const MissionCenter: FC<MissionCenterProps> = (props: PropsWithChildren<MissionCenterProps>) => {
  return <div className={styles.MissionCenter}>任务中心</div>
}

export default MissionCenter
