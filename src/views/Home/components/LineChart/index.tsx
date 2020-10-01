/**
 * 首页折线图
 */

import React, { useState, useEffect, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'

import echarts from 'echarts'
import { xAxisDataNormal, xAxisDataWarn } from './types'
import { FieldData } from '@/views/Home/types'

import styles from './index.module.scss'
import val_real from '@/assets/draw/val_real.png'
import val_finish from '@/assets/draw/val_finish.png'
import val_challenge from '@/assets/draw/val_challenge.png'
import light_red from '@/assets/draw/light_red.png'

interface LineChartProps {
  data: FieldData[]
  indexUnit: string
}

const LineChart: FC<LineChartProps> = (props: PropsWithChildren<LineChartProps>) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInit, setChartInit] = useState<any>()

  function chartSet() {
    let dataActual: number[] = []
    let dataReach: number[] = []
    let dataChallenge: number[] = []
    let xAxisData: (xAxisDataNormal | xAxisDataWarn)[] = []

    for (const iterator of props.data) {
      dataActual.push(+iterator.actualValue)
      dataReach.push(+iterator.reachTargetValue)
      dataChallenge.push(+iterator.challengeTargetValue)

      const xAxisDataValue = +iterator.trackTime.split('-')[1]

      xAxisData.push(
        +iterator.actualValue < +iterator.reachTargetValue
          ? {
              value: xAxisDataValue,
              textStyle: {
                rich: {
                  a: {
                    color: '#f56c6c',
                  },
                  b: {
                    height: 20,
                    width: 20,
                    backgroundColor: {
                      image: light_red,
                    },
                  },
                },
              },
            }
          : {
              value: xAxisDataValue,
              textStyle: {
                color: '#bdbfd3',
              },
            },
      )
    }

    chartInit.setOption({
      // 1
      grid: {
        left: 50,
        top: 72,
        right: 0,
        bottom: 50,
      },

      // 1
      legend: {
        left: '0',
        itemGap: 25,
        textStyle: {
          color: '#606266',
          lineHeight: 52,
        },
        data: [
          {
            name: '实际值',
            icon: `image://${val_real}`,
          },
          {
            name: '目标值（达标）',
            icon: `image://${val_finish}`,
          },
          {
            name: '目标值（挑战）',
            icon: `image://${val_challenge}`,
          },
        ],
      },

      // 1 name、formatter单位替换
      yAxis: {
        type: 'value',
        name: `${props.indexUnit}`,
        nameLocation: 'start',
        nameTextStyle: {
          fontSize: 14,
          color: '#b5b7ce',
          // backgroundColor: 'pink',
          align: 'right',
          padding: [4, 8, 0, 0],
        },
        nameGap: 9,
        axisLabel: {
          margin: 8,
          formatter: `{a|{value}}`,
          rich: {
            a: {
              fontSize: 14,
              color: '#b5b7ce',
            },
          },
        },
        axisTick: { show: false },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: '#eaebf1',
          },
        },
      },

      // 1 axisLabel.formatter单位
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          margin: 6,
          formatter(value: string, index: number) {
            return `{a|${value}${'月'}}\n{b|}`
          },
          rich: {
            a: {
              fontSize: 14,
              lineHeight: 20,
            },
          },
        },
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: '#eaebf1',
          },
        },
        data: xAxisData,
      },

      // 1
      series: [
        {
          name: '实际值',
          data: dataActual,
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color: '#f2c961',
            width: 2,
            type: 'solid',
          },
          animation: false,
          itemStyle: {
            normal: {
              borderWidth: 2,
              borderColor: '#f2c961',
              color: 'white',
            },
            emphasis: {
              borderWidth: 2,
              borderColor: '#f2c961',
              color: 'white',
            },
          },
        },
        {
          name: '目标值（达标）',
          data: dataReach,
          type: 'line',
          symbol: 'none',
          lineStyle: {
            color: '#7acc7e',
            width: 2,
            type: 'dotted',
          },
        },
        {
          name: '目标值（挑战）',
          data: dataChallenge,
          type: 'line',
          symbol: 'none',
          lineStyle: {
            color: '#5c97f8',
            width: 2,
            type: 'dotted',
          },
        },
      ],

      // 1 formatter单位
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            type: 'dashed',
            color: '#909399',
          },
        },
        formatter(params: any): string {
          return `
            <div class="dc-tooltip">
              <div class="dc-tooltip-item actual">
                <span class="block"></span>
                <span>
                  ${params[0].seriesName}：
                  <span class="${params[0].value < params[1].value ? 'wran' : ''}">
                    ${params[0].value}${props.indexUnit}
                  </span>
                </span>
              </div>
              <div class="dc-tooltip-item reach">
                <span class="block"></span>
                <span>${params[1].seriesName}：${params[1].value}${props.indexUnit}</span>
              </div>
              <div class="dc-tooltip-item challenge">
                <span class="block"></span>
                <span>${params[2].seriesName}：${params[2].value}${props.indexUnit}</span>
              </div>
            </div>
          `
        },
        backgroundColor: 'transparent',
        padding: 0,
      },
    })
  }

  useEffect(() => {
    chartInit && chartSet()

    // eslint-disable-next-line
  }, [chartInit, props.data])

  useEffect(() => {
    setChartInit(echarts.init(chartRef.current))
  }, [])

  return (
    <>
      <div className={styles.LineChart} ref={chartRef}></div>
    </>
  )
}

export default LineChart
