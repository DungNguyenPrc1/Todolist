import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {RootState} from '@store/index';

interface SliceState {
  todoList: Array<string>;
}
const initialState = {
  todoList: ['1', '2'],
} as SliceState;

export const Slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state: SliceState, {payload}: PayloadAction<string>) => {},
  },
});
export const {addTodo} = Slice.actions;
export const todoSelector = (state: RootState) => state.todo.todoList;

export default Slice.reducer;
