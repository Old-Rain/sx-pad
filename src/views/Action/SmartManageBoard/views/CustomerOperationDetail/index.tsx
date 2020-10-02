/**
 * 客户经营漏斗详情页
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface CustomerOperationDetailProps {}

const CustomerOperationDetail: FC<CustomerOperationDetailProps> = (
  props: PropsWithChildren<CustomerOperationDetailProps>,
) => {
  return <div className={styles.CustomerOperationDetail}>客户经营漏斗详情页</div>
}

export default CustomerOperationDetail
