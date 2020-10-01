/**
 * 增员管理
 */

import React from 'react'
import { FC, PropsWithChildren } from 'react'

import Constructing from '@/components/Constructing'

import styles from './index.module.scss'

interface AddMemberProps {}

const AddMember: FC<AddMemberProps> = (props: PropsWithChildren<AddMemberProps>) => {
  return (
    <div className={styles.AddMember}>
      <Constructing moduleName="增员管理" />
    </div>
  )
}

export default AddMember
