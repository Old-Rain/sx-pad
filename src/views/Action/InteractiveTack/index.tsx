import React, { useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface InteractiveTackProps {}

const InteractiveTack: FC<InteractiveTackProps> = (props: PropsWithChildren<InteractiveTackProps>) => {
  useEffect(() => {
    console.log('InteractiveTack')
  })
  return <div className={styles.InteractiveTack}>活动结果看板</div>
}

export default InteractiveTack
