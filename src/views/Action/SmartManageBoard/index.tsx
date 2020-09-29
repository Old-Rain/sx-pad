import React, { useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface SmartManageBoardProps {}

const SmartManageBoard: FC<SmartManageBoardProps> = (props: PropsWithChildren<SmartManageBoardProps>) => {
  console.log('SmartManageBoard')
  useEffect(() => {})
  return <div className={styles.SmartManageBoard}>智慧经营看板</div>
}

export default SmartManageBoard
