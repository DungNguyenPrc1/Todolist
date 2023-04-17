// src/features/todo/todoSlice.js
import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import type {RootState} from '../../index';
// Define a type for the slice state

export interface LoginPayload {
  email: string;
  password: string;
}
export type DataTokenType = {
  accessToken: string;
  refreshToken: string;
};

interface SliceState {
  dataToken: DataTokenType;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState = {
  dataToken: {
    accessToken: '',
    refreshToken: '',
  },
  isLoggedIn: false,
} as SliceState;

export const logoutAction = createAction<undefined>('auth/logoutAction');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsync: (state: SliceState, {payload}: PayloadAction<string>) => {},
    dataLogin: (state: SliceState, {payload}: PayloadAction<any>) => {
      state.dataToken.accessToken = payload.accessToken;
      state.isLoggedIn = payload.isLoggedIn;
    },
  },
});
// actions
export const {loginAsync, dataLogin} = authSlice.actions;

// selectors
export const authSelector = (state: RootState) => state.auth;
export const accessTokenSelector = (state: RootState) =>
  state.auth?.dataToken?.accessToken;
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
