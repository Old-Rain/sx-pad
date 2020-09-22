import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

const usePuzzle = () => {
  let resolve_: (value?: unknown) => void = function () {}
  let reject_: (reason?: any) => void = function () {}
  new Promise((resolve, reject) => {
    resolve_ = resolve
    reject_ = reject
  })

  return { resolve_, reject_ }
}

interface PuzzleProps {}

const Puzzle: FC<PuzzleProps> = (props: PropsWithChildren<PuzzleProps>) => {
  // const

  return (
    <div className={styles.Puzzle}>
      <button>确认</button>
      <button>取消</button>
    </div>
  )
}

export default Puzzle
