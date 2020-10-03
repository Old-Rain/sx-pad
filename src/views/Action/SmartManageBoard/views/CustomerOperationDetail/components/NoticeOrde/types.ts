export interface ValueFields {
  /**
   * 不同榜单取值字段不同
   */
  grandValue?: string
  avgValue?: string
  historyGrandValue?: string
  historyAvgValue?: string
}

export type Fields = keyof ValueFields

/**
 * 组榜单
 */
export interface GroupIndex extends ValueFields {
  groupName: string
  month: string
  indexName: string
  groupId: string
  deptId: string
  indexUnit: string
  indexCode: string
}

/**
 * 组内业务员榜单
 */
export interface StaffIndex extends ValueFields {
  indexName: string
  groupId: string
  empName: string
  empNo: string
  indexUnit: string
  indexCode: string
}
