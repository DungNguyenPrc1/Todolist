import {delay, put, select, takeEvery} from 'redux-saga/effects';
import {launchAppHandler} from './reducer';
import {useSelector} from 'react-redux';
import {
  accessTokenSelector,
  isLoggedInSelector,
} from '@redux/authentication/reducer';
import {navigateReset} from '@navigations/index';
function* launchApp() {
  yield delay(1000);
  const accessToken: string = yield select(accessTokenSelector);
  const isLoggedIn: boolean = yield select(isLoggedInSelector);

  if (isLoggedIn === true) {
    navigateReset('todo');
  } else {
    navigateReset('auth');
  }
}

export default function* () {
  yield takeEvery(launchAppHandler.type, launchApp);
}
