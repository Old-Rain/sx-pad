/**
 * 深度为2层的面包屑
 */

import React, { memo } from 'react'
import { FC, PropsWithChildren } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'

interface CrumbsLv2Props {
  from: string
  children: string | string[]
}

const CrumbsLv2: FC<CrumbsLv2Props> = (props: PropsWithChildren<CrumbsLv2Props>) => {
  const history = useHistory()

  return (
    <div className={styles.CrumbsLv2}>
      <button onClick={history.goBack}>{props.from}</button>
      <span>/</span>
      <span>{props.children}</span>
    </div>
  )
}

export default memo(CrumbsLv2, ({ children: prevChildren }, { children: nextChildren }) => {
  if (typeof prevChildren === 'string') {
    prevChildren = [prevChildren]
  }
  if (typeof nextChildren === 'string') {
    nextChildren = [nextChildren]
  }

  return (prevChildren as string[]).join() === (nextChildren as string[]).join()
})
