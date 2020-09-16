import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface AsideProps {}

const Aside: FC<AsideProps> = (props: PropsWithChildren<AsideProps>) => {
  return <div className={styles.Aside}>何意百炼钢，化为绕指柔！</div>
}

export default Aside
