/**
 * 看板全局时间
 */

import React, { useState, useEffect, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Unsubscribe } from 'redux'

import store from '@/store'
import { SMART_MANAGE_BOARD } from '@/store/modules/action/smartManageBoard/actionTypes'

import moment, { Moment } from 'moment'
import { getMonthLastDay } from '@/utils/tools'

import { DatePicker } from 'antd'

import styles from './index.module.scss'

// 获取看板全局时间
function getMonth() {
  return store.getState().smartManageBoardModule.smartManageBoardMonth
}

// 更新看板全局时间、派发获取指标
function updateMonth(value: Moment | null, dateString: string) {
  store.dispatch({
    type: SMART_MANAGE_BOARD.UPDATE_MONTH,
    value: dateString,
  })
  store.dispatch({ type: SMART_MANAGE_BOARD.GET_DEPT_INDEX })
}

// 禁止选择的时间
function disabledDate(date: Moment) {
  console.log()

  // 当前时间
  const nowD = new Date()
  const currentYear = nowD.getFullYear()
  const currentMonth = nowD.getMonth()
  const currentDate = nowD.getDate()

  // 选择器时间
  const pickerD = new Date(+date)
  const pickerYear = pickerD.getFullYear()
  const pickerMonth = pickerD.getMonth()

  // 大于今年
  if (pickerYear > currentYear) {
    return true
  }

  // 今年、大于当月
  if (pickerYear === currentYear && pickerMonth > currentMonth) {
    return true
  }

  // 今年、当月、小于等于2号
  if (pickerYear === currentYear && pickerMonth === currentMonth && currentDate <= 2) {
    return true
  }

  // 四年前
  if (currentYear - pickerYear > 3) {
    return true
  }

  // 三年前、小于当月
  if (currentYear - pickerYear === 3 && pickerMonth < currentMonth) {
    return true
  }

  return false
}

// 统计时间格式化
function statisticsDateFormat(value: string) {
  // 统计时间的最后一天为今天的前两天
  const nowD = new Date(+new Date() - 1000 * 60 * 60 * 48)

  const selectYear = +value.split('-')[0] // 所选的年份
  const selectMonth = +value.split('-')[1] // 所选的月份

  const currentYear = nowD.getFullYear() // 当前年份
  const currentMonth = nowD.getMonth() + 1 // 当前月份

  const firstDate = `${value.replace(/-/g, '/')}/01` // 所选月份第一天
  const lastDate = getMonthLastDay(firstDate) // 所选月份第一天

  // 所选年份小于当前年份 || 所选月份小于当前月份 => 2020/08/01 ~ 2020/08/31
  if (selectYear < currentYear || selectMonth < currentMonth) {
    return `${firstDate} ~ ${moment(lastDate).format('YYYY/MM/DD')}`
  }

  // 所选月份等于当前月份
  if (selectYear === currentYear && selectMonth === currentMonth) {
    return `${firstDate} ~ ${moment(nowD).format('YYYY/MM/DD')}`
  }

  return '-'
}

interface TheDatePickerProps {
  extraClass?: string
}

const TheDatePicker: FC<TheDatePickerProps> = (props: PropsWithChildren<TheDatePickerProps>) => {
  // 月份时间
  const [month, setMonth] = useState(moment(getMonth()))

  // 卸载redux监听
  const unsubscribe = useRef<Unsubscribe>()

  useEffect(() => {
    unsubscribe.current = store.subscribe(() => {
      setMonth(moment(getMonth()))
    })

    return () => {
      unsubscribe.current!()
    }
  }, [])

  return (
    <div className={[styles.TheDatePicker, props.extraClass].join(' ')}>
      <div className={styles.dateFormat}>统计时间：{statisticsDateFormat(moment(getMonth()).format('YYYY-MM'))}</div>
      <DatePicker
        picker="month"
        allowClear={false}
        inputReadOnly={true}
        defaultValue={month}
        disabledDate={disabledDate}
        className={styles.datePicker}
        dropdownClassName={styles.datePickerDropdown}
        onChange={updateMonth}
      />
    </div>
  )
}

export default TheDatePicker
