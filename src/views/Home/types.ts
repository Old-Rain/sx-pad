/**
 * 子指标周期数据
 */
export interface FieldData {
  /**
   * 时间
   */
  trackTime: string

  /**
   * 指标单位
   */
  indexUtil: string

  /**
   * 数据周期：周 月 年
   */
  trackFrequency: 'W' | 'M' | 'Y'

  /**
   * 实际值
   */
  actualValue: string

  /**
   * 目标值
   */
  reachTargetValue: string

  /**
   * 挑战值
   */
  challengeTargetValue: string
}

/**
 * 子指标信息
 */
export interface EmFieldIndicatorRes {
  /**
   * 指标编号
   */
  fieldNo: string

  /**
   * 指标名称
   */
  fieldIndicatorName: string

  /**
   * 指标周期数据列表
   */
  fieldDataList: FieldData[]

  /**
   * 相对于所有子指标的排序
   */
  realIndex?: number
}

/**
 * 主指标
 */

export interface SecondaryRes {
  /**
   * 指标类型
   */
  secondaryType: string

  /**
   * 指标名称
   */
  secondaryName: string

  /**
   * 子指标信息列表
   */
  emFieldIndicatorResList: EmFieldIndicatorRes[]
}
