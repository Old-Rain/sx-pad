/**
 * 部门指标
 */
export interface SelectDeptIndexData {
  /**
   * 指标类型，固定为1
   */
  indexType: '1'

  /**
   * 月份时间
   */
  month: string
}

/**
 * 指标下榜单组
 */
export interface SelecGroupIndexData {
  /**
   * 指标类型，固定为1
   */
  indexType: '1'

  /**
   * 主指标下榜单组类型
   * 1累计 2人均 3历史累计 4历史人均
   */
  mark: 1 | 2 | 3 | 4

  /**
   * 主指标类型
   */
  indexCode: string

  /**
   * 月份时间
   */
  month: string

  /**
   * 排序
   */
  groupFlag: boolean
}

/**
 * 榜单组内业务员
 */
export interface SelecStaffIndexData {
  /**
   * 指标类型，固定为1
   */
  indexType: '1'

  /**
   * 主指标下榜单组类型
   * 1累计 2人均 3历史累计 4历史人均
   */
  mark: 1 | 2 | 3 | 4

  /**
   * 主指标类型
   */
  indexCode: string

  /**
   * 榜单组id
   */
  groupId: string

  /**
   * 月份时间
   */
  month: string

  /**
   * 排序
   */
  staffFlag: boolean
}
