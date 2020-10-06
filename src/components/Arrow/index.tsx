/**
 * 静态箭头
 */

import React, { memo } from 'react'
import { MouseEvent } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface ArrowProps {
  /**
   * 箭头朝向
   */
  direction: 'top' | 'right' | 'bottom' | 'left'

  /**
   * 点击事件回调
   */
  onClick?: ((event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void) | undefined
}

const Arrow: FC<ArrowProps> = (props: PropsWithChildren<ArrowProps>) => {
  return (
    <i className={[styles.Arrow, styles[`Arrow-${props.direction}`]].join(' ')} onClick={(e) => props.onClick?.(e)}></i>
  )
}

export default memo(Arrow)
