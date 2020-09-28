import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface SmartManageBoardProps {}

const SmartManageBoard: FC<SmartManageBoardProps> = (props: PropsWithChildren<SmartManageBoardProps>) => {
  return <div className={styles.SmartManageBoard}>智慧经营看板</div>
}

export default SmartManageBoard
