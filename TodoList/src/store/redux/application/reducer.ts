// src/features/todo/todoSlice.js
import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import type {RootState} from '../../index';
// Define a type for the slice state

interface DeviceInfor {
  deviceId?: string;
  deviceName?: string;
  deviceToken?: string;
  platform?: string;
  osVersion?: string;
}

interface SliceState {
  isLoading: boolean;
  deviceInfor: DeviceInfor;
}

// Define the initial state using that type
const initialState = {
  isLoading: false,
  deviceInfor: {},
} as SliceState;

export const Slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLoading: (state: SliceState, {payload}: {payload: boolean}) => {
      state.isLoading = payload;
    },
    setUserDeviceInfor: (
      state: SliceState,
      {payload}: PayloadAction<DeviceInfor>,
    ) => {
      state.deviceInfor = payload;
    },
    launchAppHandler: () => {},
  },
});
// actions
export const {setLoading, launchAppHandler, setUserDeviceInfor} = Slice.actions;

// selectors
export const loadingSelector = (state: RootState) =>
  state.application.isLoading;

export default Slice.reducer;
