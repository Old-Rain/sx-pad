/**
 * 子指标周期数据
 */
export interface FieldDataList {
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
}

/**
 * 子指标信息
 */
export interface EmFieldIndicatorResList {
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
  fieldDataList: FieldDataList[]
}

/**
 * 主指标
 */

export interface SecondaryResList {
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
  emFieldIndicatorResList: EmFieldIndicatorResList[]
}
