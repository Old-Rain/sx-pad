import { takeEvery } from 'redux-saga/effects'

// 智慧经营看板
import { SMART_MANAGE_BOARD } from './modules/action/smartManageBoard/actionTypes'
import { SMB__GET_DEPT_INDEX } from './modules/action/smartManageBoard/saga'

function* mySaga() {
  yield takeEvery(SMART_MANAGE_BOARD.GET_DEPT_INDEX, SMB__GET_DEPT_INDEX)
}

export default mySaga
