import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface HomeProps {}

const Home: FC<HomeProps> = (props: PropsWithChildren<HomeProps>) => {
  return <div className={styles.Home}>首页正在建设</div>
}

export default Home
