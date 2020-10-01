export type xAxisDataNormal = {
  value: string | number
  textStyle: {
    color: '#bdbfd3'
  }
}

export interface xAxisDataWarn {
  value: string | number
  textStyle: {
    rich: {
      a: {
        color: '#f56c6c' // 警告颜色
      }
      b: {
        height: 20
        width: 20
        backgroundColor: {
          image: string // 警告图标
        }
      }
    }
  }
}
