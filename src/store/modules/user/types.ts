export type AuthStatus = 0 | -1 | 1 // 0未鉴权 -1鉴权失败 1鉴权成功

export interface UserInfo {
  userName?: string
  userId?: string
  rankCode?: string
  rankDesc?: string
  deptCode?: string
  deptDesc?: string
  token?: string
}
