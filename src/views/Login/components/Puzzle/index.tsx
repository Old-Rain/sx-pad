import React, { forwardRef, useImperativeHandle } from 'react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import styles from './index.module.scss'

interface PuzzleProps {
  visible: boolean
}

export interface PuzzleComfirm {
  comfirm: () => Promise<any>
}

let resolve_: (value?: any) => void = () => {}
let reject_: (reason?: any) => void = () => {}

const Puzzle: ForwardRefExoticComponent<PuzzleProps & RefAttributes<PuzzleComfirm>> = forwardRef<
  PuzzleComfirm,
  PuzzleProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    comfirm: () =>
      new Promise((resolve, reject) => {
        resolve_ = resolve
        reject_ = reject
      }),
  }))

  return (
    <div className={styles.Puzzle} style={{ display: props.visible ? 'block' : 'none' }}>
      <div className={styles.wrap}>
        <button onClick={() => reject_(false)}>取消</button>
        <button onClick={() => resolve_(true)}>确认</button>
      </div>
    </div>
  )
})

export default Puzzle
