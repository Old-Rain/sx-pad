import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface AddMemberProps {}

const AddMember: FC<AddMemberProps> = (props: PropsWithChildren<AddMemberProps>) => {
  return <div className={styles.AddMember}>个人绩效</div>
}

export default AddMember
