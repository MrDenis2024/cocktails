import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Cocktail} from '../types';

export const fetchCocktails = createAsyncThunk<Cocktail[], void>('cocktails/fetchAll', async () => {
  const {data: cocktails} = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktails;
});

export const changeCocktail = createAsyncThunk<void, string>('cocktails/change', async (id) => {
  await axiosApi.patch(`/cocktails/${id}/togglePublished`);
});

export const deleteCocktail = createAsyncThunk<void, string>('cocktails/delete', async (id) => {
  await axiosApi.delete(`/cocktails/${id}`);
});