/**
 * 行事历
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface MeetingProps {}

const Meeting: FC<MeetingProps> = (props: PropsWithChildren<MeetingProps>) => {
  return (
    <div className={styles.Meeting}>
      <Constructing moduleName="行事历" />
    </div>
  )
}

export default Meeting
