/**
 * 客户活动结果
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface CustomerActionProps {}

const CustomerAction: FC<CustomerActionProps> = (props: PropsWithChildren<CustomerActionProps>) => {
  return (
    <div className={styles.CustomerAction}>
      <Constructing moduleName="客户活动结果" />
    </div>
  )
}

export default CustomerAction
