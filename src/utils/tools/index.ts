/**
 * px转vw
 * @param px 设计稿标注的px
 */
export function px2vw(px: number): number {
  return (window.innerWidth * px) / 1366
}

/**
 * 指定范围内的随机整数
 * @param min 最小值
 * @param max 最大值
 */
export function rangeInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 返回dom元素相对于window的偏移量
 * @param dom 指定的dom元素
 */
export function domOffset(dom: HTMLElement) {
  let left = 0
  let top = 0

  do {
    left += dom.offsetLeft
    top += dom.offsetTop
    dom = dom.offsetParent as HTMLElement
  } while (dom)

  return { left, top }
}
