import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface LoadingProps {}

const Loading: FC<LoadingProps> = (props: PropsWithChildren<LoadingProps>) => {
  return (
    <div className={styles.Loading}>
      <div className={styles.spin}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Loading
