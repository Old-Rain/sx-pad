/**
 * 主指标和子指标公有属性
 */
export interface CustomerOperationIndexCommon {
  indexLv: string
  indexCode: string
  indexName: string
  indexUnit: string
  standardAvgValue: string
  avgValue: string
  grandValue: string
  historyGrandValue?: string
  historyAvgValue?: string
}

/**
 * 客户经营漏斗子指标格式
 */
export interface SecondaryIndex extends CustomerOperationIndexCommon {
  parentIndexCode: string
  realIndex?: number // 手动添加真实排序字段
}

/**
 * 客户经营漏斗主指标格式
 */
export interface DeptIndexRes extends CustomerOperationIndexCommon {
  secondaryIndexList: SecondaryIndex[]
}
