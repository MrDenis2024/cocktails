import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegisterMutation, User, ValidationError} from '../types';
import {isAxiosError} from 'axios';
import axiosApi from '../axiosApi';

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>('users/register', async (registerMutation,  {rejectWithValue}) => {
  try {
    const formData = new FormData();
    formData.append('email', registerMutation.email);
    formData.append('password', registerMutation.password);
    formData.append('displayName', registerMutation.displayName);

    if(registerMutation.avatar) {
      formData.append('avatar', registerMutation.avatar);
    }

    const {data: user} = await axiosApi.post<User>('/users', formData);
    return user;
  } catch (e) {
    if(isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});