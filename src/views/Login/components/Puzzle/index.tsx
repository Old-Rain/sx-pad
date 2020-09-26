import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, useLayoutEffect } from 'react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import styles from './index.module.scss'
import soupImg from '@/assets/soup.png'
import { soupList } from './soupList'

import { isMobile, px2vw, domOffset, rangeInt } from '@/utils/tools'

// 拼图样式
function puzzleStyle(
  ctx: CanvasRenderingContext2D,
  offsetLeft: number,
  offsetTop: number,
  rightStyle: boolean,
  bottomStyle: boolean,
) {
  ctx.lineTo(offsetLeft + 40, offsetTop)
  ctx.lineTo(offsetLeft + 40, offsetTop + 14)
  ctx.arc(offsetLeft + 40, offsetTop + 20, 6, -Math.PI / 2, Math.PI / 2, rightStyle)
  ctx.lineTo(offsetLeft + 40, offsetTop + 40)
  ctx.lineTo(offsetLeft + 26, offsetTop + 40)
  ctx.arc(offsetLeft + 20, offsetTop + 40, 6, 0, Math.PI, bottomStyle)
  ctx.lineTo(offsetLeft, offsetTop + 40)
  ctx.lineTo(offsetLeft, offsetTop)
}

// comfirm确认/取消
let resolve_: (value: boolean) => void = () => {}
let reject_: (reason: boolean) => void = () => {}

// 缺口canvas和填充canvas的画布
let lackCtx: CanvasRenderingContext2D | null = null
let fillCtx: CanvasRenderingContext2D | null = null

interface PuzzleProps {
  /**
   * 背景图数组
   */
  bgList: string[]

  /**
   * 显示状态
   */
  visible: boolean
}

/**
 * 暴露给父组件的方法
 */
export interface PuzzleComfirm {
  comfirm: () => Promise<boolean>
}

/**
 * 动画参数
 */
interface Animate {
  display: 'block' | 'none'
  opacity: number
  scale: number
}

const Puzzle: ForwardRefExoticComponent<PuzzleProps & RefAttributes<PuzzleComfirm>> = forwardRef<
  PuzzleComfirm,
  PuzzleProps
>((props, ref) => {
  const { bgList, visible } = props

  // 验证状态
  const [validate, setValidate] = useState<boolean>(false)

  // 动画参数
  const [animate, setAnimate] = useState<Animate>({ display: 'none', opacity: 0, scale: 0.5 })

  // 背景图
  const [bgIndex, setBgIndex] = useState<number>(0)

  // 背景图数量
  const bgListLength = useRef<number>(bgList.length - 1)

  // 毒鸡汤
  const [soupIndex, setSoupIndex] = useState<number>(rangeInt(0, soupList.length - 1))

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

  // 完成
  const doneRef = useRef<HTMLDivElement>(null)

  // 轨道
  const trackRef = useRef<HTMLDivElement>(null)

  // 轨道的offsetLeft
  const [trackOffsetLeft, setTrackOffsetLeft] = useState<number>(0)

  // 滑块
  // eslint-disable-next-line/
  const thumbRef = useRef<HTMLDivElement>(null)

  // 滑块激活状态
  const [sliding, setSliding] = useState<boolean>(false)

  // 使用useImperativeHandle将comfirm暴露给父组件
  useImperativeHandle(ref, () => ({
    comfirm: () =>
      new Promise<boolean>((resolve, reject) => {
        resolve_ = resolve
        reject_ = reject
      }),
  }))

  // 刷新背景图片
  function reload() {
    const index = rangeInt(0, bgListLength.current)

    if (index !== bgIndex) {
      setBgIndex(() => index)
      setSoupIndex(() => rangeInt(0, soupList.length - 1))
      setValidate(false)
      return
    }

    reload()
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
    puzzleStyle(lackCtx!, (lackLeft * 1366) / window.innerWidth, 56, rightStyle, bottomStyle) // 拼图轮廓
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
    fillCtx!.drawImage(transitRef.current!, -(lackLeft * 1366) / window.innerWidth, -56) // 异步绘制 [存储裁剪拼图的隐藏img] 到 [填充canvas]
    fillCtx!.stroke()
  }

  // 隐藏组件在过渡结束后
  function hide() {
    !visible && setAnimate({ ...animate, display: 'none' })
  }

  // 设置滑块和拼图的left
  function setSlideSize(size: number) {
    thumbRef.current!.style.left = `${size}px`
    fillRef.current!.style.left = `${size}px`
  }

  // 开启滑块和拼图的transition
  function removeTransition(type: 'left 0.3s' | '') {
    thumbRef.current!.style.transition = type
    fillRef.current!.style.transition = type
  }

  // 滑动开始
  function slideStart(this: HTMLDivElement, ev: TouchEvent | MouseEvent) {
    setSliding(true)
  }

  // 滑动中
  function slideMove(this: Window, ev: TouchEvent | MouseEvent) {
    let left = 0

    if (isMobile()) {
      left = (ev as TouchEvent).touches[0].pageX - trackOffsetLeft - px2vw(20)
    } else {
      ;(ev as MouseEvent).preventDefault()
      left = (ev as MouseEvent).pageX - trackOffsetLeft - px2vw(20)
    }

    // 限制滑动的左右距离
    left = left < 0 ? 0 : left > px2vw(320) ? px2vw(320) : left

    setSlideSize(left)
  }

  // 滑动结束
  function slideEnd(this: Window, ev: TouchEvent | MouseEvent) {
    setSliding(false)

    // 偏移量差不多，通过校验
    if (Math.abs(lackLeft - fillRef.current!.offsetLeft) <= px2vw(3)) {
      setValidate(true)
    }

    // 差距过大，滑块和拼图回弹至初始状态
    else {
      removeTransition('left 0.3s')
      setSlideSize(px2vw(30))
    }
  }

  // 初始化
  useEffect(() => {
    // 生成 缺口 和 填充
    lackCtx = lackRef.current!.getContext('2d')!
    fillCtx = fillRef.current!.getContext('2d')!

    lackCtx.fillStyle = 'rgba(0, 0, 0, 0.6)'
    lackCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
    lackCtx.lineWidth = 2

    fillCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
    fillCtx.lineWidth = 2

    // 滑块监听事件
    const thumbRefCurrent = thumbRef.current!
    if (isMobile()) {
      thumbRefCurrent.addEventListener('touchstart', slideStart)
    } else {
      thumbRefCurrent.addEventListener('mousedown', slideStart)
    }

    return () => {
      thumbRefCurrent.removeEventListener('touchstart', slideStart)
      thumbRefCurrent.removeEventListener('mousedown', slideStart)
    }
  }, [])

  // 显示/隐藏动画-1
  useLayoutEffect(() => {
    // 显示时，先设置display
    if (visible) {
      setAnimate((animate) => ({ ...animate, display: 'block' }))
    }

    // 隐藏时先设置opacity和scale
    else {
      setAnimate((animate) => ({ ...animate, opacity: 0, scale: 0.5 }))
    }
  }, [visible])

  // 显示/隐藏动画-2
  useEffect(() => {
    if (animate.display === 'block') {
      // display为block后再更改opacity和scale
      setAnimate((animate) => ({ ...animate, opacity: 1, scale: 1 }))

      // 设置滑块轨道的左侧偏移量
      setTrackOffsetLeft(domOffset(trackRef.current!).left)
    } else {
      // 隐藏时，将滑块和拼图的left还原
      setSlideSize(px2vw(30))

      // 组件彻底隐藏后更新背景图
      reload()
    }

    // eslint-disable-next-line
  }, [animate.display])

  // 滑块滑动事件
  useEffect(() => {
    // 滑动开始
    if (sliding) {
      // 移动端，window创建监听touchend和touchmove
      if (isMobile()) {
        window.addEventListener('touchmove', slideMove)
        window.addEventListener('touchend', slideEnd)
      }

      // PC端，window创建监听mouseup和mousemove
      else {
        window.addEventListener('mousemove', slideMove)
        window.addEventListener('mouseup', slideEnd)
      }
    }

    // 滑动结束，window卸载监听
    else {
      window.removeEventListener('touchmove', slideMove)
      window.removeEventListener('touchend', slideEnd)
      window.removeEventListener('mousemove', slideMove)
      window.removeEventListener('mouseup', slideEnd)
    }

    return () => {
      window.removeEventListener('touchmove', slideMove)
      window.removeEventListener('touchend', slideEnd)
      window.removeEventListener('mousemove', slideMove)
      window.removeEventListener('mouseup', slideEnd)
    }

    // eslint-disable-next-line
  }, [sliding])

  return (
    <div
      className={styles.Puzzle}
      style={{ display: animate.display, opacity: animate.opacity }}
      onTransitionEnd={hide}
    >
      {/* 弹窗 */}
      <div className={styles.wrap} style={{ transform: `scale(${animate.scale})`, opacity: animate.opacity }}>
        {/* 标题 */}
        <h3 className={styles.title}>
          <button onClick={() => reject_(false)}>返回</button>
          安全验证
        </h3>

        {/* 提示 */}
        <p className={styles.tip}>
          <span>拖动下方滑块完成拼图</span> <button onClick={reload}>刷新</button>
        </p>

        {/* 核心 */}
        <div className={styles.core}>
          {/* 背景图 */}
          <img className={styles.bg} ref={bgRef} src={bgList[bgIndex]} onLoad={draw} alt="" />

          {/* 缺口 */}
          <canvas
            className={styles.lack}
            ref={lackRef}
            style={{ display: validate ? 'none' : 'block' }}
            width="360"
            height="200"
          ></canvas>

          {/* 填充 */}
          <canvas
            className={styles.fill}
            ref={fillRef}
            style={{ display: validate ? 'none' : 'block' }}
            width="48"
            height="48"
          ></canvas>

          {/* 验证通过 */}
          <div className={styles.done} ref={doneRef} style={{ display: validate ? 'flex' : 'none' }}>
            <img src={soupImg} alt="" />
            <p>{soupList[soupIndex]}</p>
          </div>
        </div>

        {/* 滑块 */}
        <div className={styles.slide} style={{ display: validate ? 'none' : 'flex' }}>
          <div className={styles.track} ref={trackRef}>
            <div className={styles.thumb} ref={thumbRef} onTransitionEnd={() => removeTransition('')}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* 确认验证 */}
        {validate ? (
          <div className={styles.resolve}>
            <button onClick={() => resolve_(true)}>确 认</button>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* 缺口到填充的中转 */}
      <img className={styles.transit} ref={transitRef} alt="" />
    </div>
  )
})

export default Puzzle
