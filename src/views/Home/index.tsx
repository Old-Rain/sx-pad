/**
 * 首页
 */

import React, { useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'

import { deptCoreIndexByHalfYear, deptCoreIndexByYear } from '@/api/home'
import { EmFieldIndicatorRes, SecondaryRes } from './types'

import { message } from 'antd'
import Layout from '@/components/Layout'
import LayoutCard from '@/components/LayoutCard'
import LineChart from './components/LineChart'
import Table from './components/Table'

import styles from './index.module.scss'

interface HomeProps {}

const Home: FC<HomeProps> = (props: PropsWithChildren<HomeProps>) => {
  // 最近半年数据
  const [halfYearData, setHalfYearData] = useState<EmFieldIndicatorRes[]>([])

  // 最近一年数据
  const [yearData, setYearData] = useState<SecondaryRes[]>([])

  // 获取半年数据
  async function getDeptCoreIndexByHalfYear() {
    const { data: res } = (await deptCoreIndexByHalfYear<EmFieldIndicatorRes[]>()) || { data: {} }

    if (!res || res.code !== '00') {
      message.error({ content: res?.message ?? '未知错误' })
      return
    }

    setHalfYearData(res.data)
  }

  // 获取全年数据
  async function getDeptCoreIndexByYear() {
    const { data: res } = (await deptCoreIndexByYear<{ secondaryResList: SecondaryRes[] }>()) || { data: {} }

    if (!res || res.code !== '00') {
      message.error({ content: res?.message ?? '未知错误' })
      return
    }

    let realIndex = 0
    for (const iterator of res.data.secondaryResList) {
      for (const iterator1 of iterator.emFieldIndicatorResList) {
        iterator1.realIndex = realIndex++
      }
    }

    setYearData(res.data.secondaryResList)
  }

  useEffect(() => {
    getDeptCoreIndexByHalfYear()
    getDeptCoreIndexByYear()
  }, [])

  return (
    <div className={styles.Home}>
      {/* 一楼 */}
      <Layout>
        <LayoutCard title={halfYearData[0]?.fieldIndicatorName ?? ''}>
          <LineChart data={halfYearData[0]?.fieldDataList ?? []} indexUnit="次" />
        </LayoutCard>
        <LayoutCard title={halfYearData[1]?.fieldIndicatorName ?? ''}>
          <LineChart data={halfYearData[1]?.fieldDataList ?? []} indexUnit="件" />
        </LayoutCard>
      </Layout>

      {/* 二楼 */}
      <Layout>
        <LayoutCard title={halfYearData[2]?.fieldIndicatorName ?? ''}>
          <LineChart data={halfYearData[2]?.fieldDataList ?? []} indexUnit="件" />
        </LayoutCard>
        <LayoutCard title={halfYearData[3]?.fieldIndicatorName ?? ''}>
          <LineChart data={halfYearData[3]?.fieldDataList ?? []} indexUnit="%" />
        </LayoutCard>
      </Layout>

      {/* 三楼 */}
      <Layout>
        <LayoutCard title={'部经理活动结果追因看板'}>
          <Table data={yearData} />
        </LayoutCard>
      </Layout>
    </div>
  )
}

export default Home
