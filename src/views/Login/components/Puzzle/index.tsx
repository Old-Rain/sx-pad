import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import styles from './index.module.scss'

import { px2vw } from '@/utils/tools'

// 范围内的随机整数
function rangeInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 拼图样式
function puzzleStyle(
  ctx: CanvasRenderingContext2D,
  offsetLeft: number,
  offsetTop: number,
  rightStyle: boolean,
  bottomStyle: boolean,
) {
  ctx.moveTo(offsetLeft, offsetTop)
  ctx.lineTo(offsetLeft + px2vw(40), offsetTop)
  ctx.lineTo(offsetLeft + px2vw(40), offsetTop + px2vw(14))
  ctx.arc(offsetLeft + px2vw(40), offsetTop + px2vw(20), px2vw(6), -Math.PI / 2, Math.PI / 2, rightStyle)
  ctx.lineTo(offsetLeft + px2vw(40), offsetTop + px2vw(40))
  ctx.lineTo(offsetLeft + px2vw(26), offsetTop + px2vw(40))
  ctx.arc(offsetLeft + px2vw(20), offsetTop + px2vw(40), px2vw(6), 0, Math.PI, bottomStyle)
  ctx.lineTo(offsetLeft, offsetTop + px2vw(40))
  ctx.lineTo(offsetLeft, offsetTop)
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

  // 背景图img
  const bgRef = useRef<HTMLImageElement>(null)

  // 缺口切片中转img
  const transitRef = useRef<HTMLImageElement>(null)

  // 缺口canvas
  const lackRef = useRef<HTMLCanvasElement>(null)

  // 填充canvas
  const fillRef = useRef<HTMLCanvasElement>(null)

  // 使用useImperativeHandle将comfirm暴露给父组件
  useImperativeHandle(ref, () => ({
    comfirm: () =>
      new Promise<boolean>((resolve, reject) => {
        resolve_ = resolve
        reject_ = reject
      }),
  }))

  // 刷新背景图片
  function reloadBg() {
    const index = rangeInt(0, 3)

    if (index !== bgIndex) {
      setBgIndex(index)
      return
    }

    reloadBg()
  }

  // 绘制
  async function draw() {
    // 拼图样式
    const rightStyle = Math.random() > 0.5
    const bottomStyle = Math.random() > 0.5

    // 随机缺口距离
    const lackLeft = rangeInt(px2vw(160), px2vw(240))
    setLackLeft(lackLeft)

    // 绘制缺口
    lackCtx!.restore()
    lackCtx!.clearRect(0, 0, lackRef.current!.width, lackRef.current!.height)
    lackCtx!.save()
    lackCtx!.beginPath()
    puzzleStyle(lackCtx!, lackLeft, px2vw(56), rightStyle, bottomStyle) // 拼图轮廓
    fillCtx!.closePath()
    lackCtx!.clip()
    lackCtx!.drawImage(bgRef.current!, 0, 0)
    transitRef.current!.src = lackRef.current!.toDataURL('image/png') // 将裁剪的拼图存到隐藏的img
    lackCtx!.fill()
    lackCtx!.stroke()

    // 绘制填充
    fillCtx!.restore()
    fillCtx!.clearRect(0, 0, fillRef.current!.width, fillRef.current!.height)
    fillCtx!.save()
    fillCtx!.beginPath()
    puzzleStyle(fillCtx!, 0, 0, rightStyle, bottomStyle) // 拼图轮廓
    fillCtx!.closePath()
    fillCtx!.clip()
    await Promise.resolve()
    fillCtx!.drawImage(transitRef.current!, -lackLeft, -px2vw(56)) // 异步绘制 [存储裁剪拼图的隐藏img] 到 [填充canvas]
    fillCtx!.stroke()
  }

  // 初始化完毕生成 缺口 和 填充
  useEffect(() => {
    lackCtx = lackRef.current!.getContext('2d')!
    fillCtx = fillRef.current!.getContext('2d')!

    lackCtx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    lackCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    lackCtx.lineWidth = 2

    fillCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    fillCtx.lineWidth = 2
  }, [])

  // 弹窗隐藏时随机更新背景，触发背景图onload
  useEffect(() => {
    if (!props.visible) {
      setBgIndex(rangeInt(0, 3))
    }
  }, [props.visible])

  return (
    <div className={styles.Puzzle} style={{ display: props.visible ? 'block' : 'none' }}>
      {/* <button onClick={() => resolve_(true)}>确认</button> */}

      <div className={styles.wrap}>
        <h3 className={styles.title}>
          <button onClick={() => reject_(false)}>返回</button>
          安全验证
        </h3>

        <p className={styles.tip}>
          <span>拖动下方滑块完成拼图</span> <button onClick={reloadBg}>刷新</button>
        </p>

        <div className={styles.core}>
          {/* 背景图 */}
          <img className={styles.bg} ref={bgRef} src={puzzleBgs[bgIndex]} alt="" onLoad={draw} />

          {/* 缺口 */}
          <canvas className={styles.lack} ref={lackRef} width={px2vw(360)} height={px2vw(200)}></canvas>

          {/* 填充 */}
          <canvas
            className={styles.fill}
            ref={fillRef}
            width={px2vw(48)}
            height={px2vw(48)}
            onClick={() => console.log(lackLeft)}
          ></canvas>
        </div>
      </div>

      {/* 缺口到填充的中转 */}
      <img className={styles.transit} ref={transitRef} src={puzzleBgs[3]} alt="" />
    </div>
  )
})

export default Puzzle
