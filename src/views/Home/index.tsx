import React, { useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import { deptCoreIndexByHalfYear, deptCoreIndexByYear } from '@/api/home'
import { EmFieldIndicatorResList, SecondaryResList } from './types'

import styles from './index.module.scss'

interface HomeProps {}

const Home: FC<HomeProps> = (props: PropsWithChildren<HomeProps>) => {
  useEffect(() => {
    ;(async () => {
      const { data: res } = (await deptCoreIndexByHalfYear<EmFieldIndicatorResList[]>()) || { data: {} }
      console.log(res)
    })()
    ;(async () => {
      const { data: res } = (await deptCoreIndexByYear<{ secondaryResList: SecondaryResList[] }>()) || { data: {} }
      console.log(res)
    })()
  })
  return <div className={styles.Home}>首页正在建设</div>
}

export default Home
