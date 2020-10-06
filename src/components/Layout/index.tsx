/**
 * 布局容器
 */

import React, { memo } from 'react'
import { ReactNode } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface LayoutProps {
  /**
   * 额外样式
   */
  extraClass?: string

  children: ReactNode
}

const Layout: FC<LayoutProps> = (props: PropsWithChildren<LayoutProps>) => {
  return <div className={[styles.Layout, props.extraClass].join(' ')}>{props.children}</div>
}

export default memo(Layout)
