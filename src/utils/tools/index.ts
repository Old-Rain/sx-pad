/**
 * px转vw
 * @param px 设计稿标注的px
 */
export function px2vw(px: number): number {
  return (window.innerWidth * px) / 1366
}
