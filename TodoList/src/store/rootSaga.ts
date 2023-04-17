import {all} from 'redux-saga/effects';
import authenticationSaga from '@redux/authentication/saga';
import applicationSaga from '@redux/application/saga';
import todoSaga from '@redux/todo/saga';

export default function* rootSaga() {
  yield all([authenticationSaga(), applicationSaga(), todoSaga()]);
}
