import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import styles from './index.module.scss'

// 范围内的随机整数
function rangeInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 拼图样式
function puzzleStyle(ctx: CanvasRenderingContext2D, rightStyle: boolean, bottomStyle: boolean) {
  ctx.moveTo(0, 0)
  ctx.lineTo((window.innerWidth * 40) / 1366, 0)
  ctx.lineTo((window.innerWidth * 40) / 1366, (window.innerWidth * 14) / 1366)
  ctx.arc((window.innerWidth * 40) / 1366, (window.innerWidth * 20) / 1366, (window.innerWidth * 6) / 1366, -Math.PI / 2, Math.PI / 2, rightStyle)
  ctx.lineTo((window.innerWidth * 40) / 1366, (window.innerWidth * 40) / 1366)
  ctx.lineTo((window.innerWidth * 26) / 1366, (window.innerWidth * 40) / 1366)
  ctx.arc((window.innerWidth * 20) / 1366, (window.innerWidth * 40) / 1366, (window.innerWidth * 6) / 1366, 0, Math.PI, bottomStyle)
  ctx.lineTo(0, (window.innerWidth * 40) / 1366)
  ctx.lineTo(0, 0)
}

// 背景图
const puzzleBgs: string[] = [
  require('@/assets/img/puzzle_0.jpg'),
  require('@/assets/img/puzzle_1.jpg'),
  require('@/assets/img/puzzle_2.jpg'),
  require('@/assets/img/puzzle_3.jpg'),
]

// comfirm确认/取消
let resolve_: (value: boolean) => void = () => {}
let reject_: (reason: boolean) => void = () => {}

let lackCtx: CanvasRenderingContext2D | null = null
let fillCtx: CanvasRenderingContext2D | null = null

interface PuzzleProps {
  visible: boolean
}

export interface PuzzleComfirm {
  comfirm: () => Promise<boolean>
}

const Puzzle: ForwardRefExoticComponent<PuzzleProps & RefAttributes<PuzzleComfirm>> = forwardRef<
  PuzzleComfirm,
  PuzzleProps
>((props, ref) => {
  // 背景图
  const [bgIndex, setBgIndex] = useState<number>(0)

  // 缺口距离
  const [lackLeft, setLackLeft] = useState<number>(0)

  // 缺口canvas
  const lackRef = useRef<HTMLCanvasElement>(null)

  // 缺口canvas
  const fillRef = useRef<HTMLCanvasElement>(null)

  // 使用useImperativeHandle将comfirm暴露给父组件
  useImperativeHandle(ref, () => ({
    comfirm: () =>
      new Promise<boolean>((resolve, reject) => {
        resolve_ = resolve
        reject_ = reject
      }),
  }))

  // 绘制
  function draw() {
    // 随机背景
    setBgIndex(rangeInt(0, 3))

    // 拼图样式
    const rightStyle = Math.random() > 0.5
    const bottomStyle = Math.random() > 0.5

    // 随机缺口距离
    setLackLeft(rangeInt((window.innerWidth * 160) / 1366, (window.innerWidth * 240) / 1366))

    // 绘制缺口
    lackCtx!.clearRect(0, 0, lackRef.current!.width, lackRef.current!.height)
    lackCtx!.beginPath()
    puzzleStyle(lackCtx!, rightStyle, bottomStyle)
    lackCtx!.closePath()
    lackCtx!.fill()
    lackCtx!.stroke()

    // 绘制填充
    fillCtx!.clearRect(0, 0, lackRef.current!.width, lackRef.current!.height)
    fillCtx!.beginPath()
    puzzleStyle(fillCtx!, rightStyle, bottomStyle)
    fillCtx!.closePath()
    fillCtx!.fill()
    fillCtx!.stroke()
  }

  // 初始化完毕生成 缺口 和 填充
  useEffect(() => {
    lackCtx = lackRef.current!.getContext('2d')!
    fillCtx = fillRef.current!.getContext('2d')!

    lackCtx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    lackCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    lackCtx.lineWidth = 1

    fillCtx.fillStyle = 'pink'
  }, [])

  // 弹窗隐藏时更新
  useEffect(() => {
    if (!props.visible) {
      draw()
    }
  }, [props.visible])

  return (
    <div className={styles.Puzzle} style={{ display: props.visible ? 'block' : 'none' }}>
      <button onClick={() => reject_(false)}>取消</button>
      <button onClick={() => resolve_(true)}>确认</button>
      <div className={styles.wrap}>
        <div className={styles.core}>
          {/* 背景图 */}
          <img className={styles.bg} src={puzzleBgs[bgIndex]} alt="" />

          {/* 缺口到填充的中转 */}
          <img className={styles.transit} src="" alt="" />

          {/* 缺口 */}
          <canvas
            className={styles.lack}
            ref={lackRef}
            style={{ left: lackLeft }}
            width={(window.innerWidth * 48) / 1366}
            height={(window.innerWidth * 48) / 1366}
          ></canvas>

          {/* 填充 */}
          <canvas
            className={styles.fill}
            ref={fillRef}
            style={{ left: (window.innerWidth * 30) / 1366 }}
            width={(window.innerWidth * 48) / 1366}
            height={(window.innerWidth * 48) / 1366}
          ></canvas>
        </div>
        <button
          onClick={() => {
            console.log(lackCtx)
          }}
        >
          ???
        </button>
      </div>
    </div>
  )
})

export default Puzzle
