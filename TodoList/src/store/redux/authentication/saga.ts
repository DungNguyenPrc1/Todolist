import Toast from '@components/Toast';
import {auth} from '@config/firebase';
import {navigate} from '@navigations/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction} from '@reduxjs/toolkit';
import {signInWithEmailAndPassword, UserCredential} from 'firebase/auth';

import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {loginAsync, LoginPayload, dataLogin, logoutAction} from './reducer';

function* loginSaga({payload}: PayloadAction<LoginPayload>) {
  try {
    const {email, password} = payload;
    const userCredential: UserCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const token: string = yield call([user, user.getIdToken]);
    // const token = yield call(user, user.getIdToken);

    yield put(dataLogin({accessToken: token, isLoggedIn: true}));
    Toast.success('Login Success');
    navigate('todo');
  } catch (error) {
    Toast.error(`${error}`);
    console.log('loginSaga', error);
  }
}

function* handleLogout() {
  yield put(
    dataLogin({
      dataToken: {
        accessToken: '',
        refreshToken: '',
      },
      isLoggedIn: false,
    }),
  );
  yield call(navigate, 'auth');
}

export default function* () {
  yield takeLatest(loginAsync.type, loginSaga);
  yield takeEvery(logoutAction.type, handleLogout);
}
