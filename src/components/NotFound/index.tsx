/**
 * 页面丢失
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = (props: PropsWithChildren<NotFoundProps>) => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.notice}>您找的页面去火星了~</div>
    </div>
  )
}

export default NotFound
