import {User} from '../types';
import {createSlice} from '@reduxjs/toolkit';

export interface UsersState {
  user: User | null;
}

const initialState: UsersState = {
  user: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state: UsersState) => state.user,
  },
});

export const usersReducer = usersSlice.reducer;
export const {
  selectUser,
} = usersSlice.selectors;