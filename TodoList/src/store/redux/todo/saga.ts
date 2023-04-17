import {PayloadAction} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {addTodo} from './reducer';

function* handleAddTodo({payload}: PayloadAction<string>) {
  console.log('Addtodo', payload);
}

export default function* () {
  yield takeLatest(addTodo.type, handleAddTodo);
}
