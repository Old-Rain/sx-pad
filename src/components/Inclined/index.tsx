/**
 * 斜边
 */

import React, { memo } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface InclinedProps {
  width: number
  height: number
  color: string
}

const Inclined: FC<InclinedProps> = (props: PropsWithChildren<InclinedProps>) => {
  return (
    <div
      className={styles.Inclined}
      style={{
        right: -props.width,
        borderLeftWidth: props.width,
        borderBottomWidth: props.height,
        borderLeftColor: props.color,
      }}
    ></div>
  )
}

export default memo(Inclined)
