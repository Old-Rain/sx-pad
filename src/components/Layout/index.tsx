/**
 * 布局容器
 */

import React from 'react'
import { ReactNode } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = (props: PropsWithChildren<LayoutProps>) => {
  return <div className={styles.Layout}>{props.children}</div>
}

export default Layout
