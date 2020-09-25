import React from 'react'
import { FC, PropsWithChildren } from 'react'

export interface FromTabItemProps {
  /**
   * tab页签
   */
  label?: string

  children?: React.ReactNode
}

const FromTabItem: FC<FromTabItemProps> = (props: PropsWithChildren<FromTabItemProps>) => {
  return <>{props.children}</>
}

export default FromTabItem
