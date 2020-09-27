import { takeEvery } from 'redux-saga/effects'

// 权限
import { AUTH } from './modules/auth/actionTypes'
import { AUTH__UPDATE } from './modules/auth/saga'

function* mySaga() {
  // 权限
  yield takeEvery(AUTH.AUTH_UPDATE, AUTH__UPDATE)
}

export default mySaga
