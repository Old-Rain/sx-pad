/**
 * 客户经营漏斗子指标格式
 */
export interface SecondaryIndex {
  realIndex?: number // 手动添加真实排序字段
  parentIndexCode: string
  indexLv: string
  indexCode: string
  indexName: string
  indexUnit: string
  standardAvgValue: string
  avgValue: string
  grandValue: string
}

/**
 * 客户经营漏斗主指标格式
 */
export interface DeptIndexRes {
  indexLv: string
  indexCode: string
  indexName: string
  indexUnit: string
  standardAvgValue: string
  historyGrandValue: string
  avgValue: string
  historyAvgValue: string
  grandValue: string
  secondaryIndexList: SecondaryIndex[]
}
