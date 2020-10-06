/**
 * 布局卡片
 */

import React, { memo } from 'react'
import { ReactNode } from 'react'
import { FC, PropsWithChildren } from 'react'

import CardTitle from '@/components/CardTitle'

import styles from './index.module.scss'

interface LayoutCardProps {
  /**
   * 标题文字，不传则默认padding-top: 16px
   */
  title?: string

  /**
   * 额外样式
   */
  extraClass?: string

  /**
   * 标题额外样式
   */
  extraTitleClass?: string

  children?: ReactNode
}

const LayoutCard: FC<LayoutCardProps> = (props: PropsWithChildren<LayoutCardProps>) => {
  return (
    <div className={[styles.LayoutCard, props.title ? '' : styles.pt16, props.extraClass].join(' ')}>
      {props.title ? <CardTitle title={props.title} extraTitleClass={props.extraTitleClass} /> : ''}
      <div className={styles.body}>{props.children}</div>
    </div>
  )
}

export default memo(LayoutCard)
