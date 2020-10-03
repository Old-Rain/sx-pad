export type CustomerOperationIndexType = '主指标' | '子指标' | ''
export type CustomerOperationIndexKey = 'deptIndexResList' | 'secondaryIndexList' | ''

export interface CustomerOperationDetailInfo {
  /**
   * 指标类型
   */
  indexType: CustomerOperationIndexType

  /**
   * 引用指标数据的key
   */
  indexKey: CustomerOperationIndexKey

  /**
   * 指标编号
   */
  indexCode: string

  /**
   * 指标索引
   */
  indexIndex: number
}
