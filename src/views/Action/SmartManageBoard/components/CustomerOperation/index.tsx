/**
 * 客户经营漏斗
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { useHistory } from 'react-router-dom'

import LayoutCard from '@/components/LayoutCard'

import styles from './index.module.scss'

interface CustomerOperationProps {}

const CustomerOperation: FC<CustomerOperationProps> = (props: PropsWithChildren<CustomerOperationProps>) => {
  const history = useHistory()

  return (
    <div className={styles.CustomerOperation}>
      <LayoutCard extraClass={styles.card}>
        <div
          style={{ height: 100, background: 'pink' }}
          onClick={() => history.push('/action/smartManageBoard/CustomerOperationDetail')}
        >
          客户经营漏斗
        </div>
      </LayoutCard>
    </div>
  )
}

export default CustomerOperation
