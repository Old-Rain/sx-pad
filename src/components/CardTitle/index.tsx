/**
 * 卡片标题
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface CardTitleProps {
  /**
   * 标题文字
   */
  title: string

  /**
   * 额外样式
   */
  extraTitleClass?: string
}

const CardTitle: FC<CardTitleProps> = (props: PropsWithChildren<CardTitleProps>) => {
  return (
    <div className={[styles.CardTitle, styles.extraTitleClass].join(' ')}>
      <span className={styles.block}></span>
      <h3>{props.title}</h3>
    </div>
  )
}

export default CardTitle
