export interface Res<T = any> {
  code: string
  message: string
  data: T
}
