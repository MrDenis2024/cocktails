import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Cocktail, CocktailMutation} from '../types';

export const fetchCocktails = createAsyncThunk<Cocktail[], void>('cocktails/fetchAll', async () => {
  const {data: cocktails} = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktails;
});

export const fetchMyCockTails = createAsyncThunk<Cocktail[], string>('cocktails/fetchMy', async (id) => {
  const {data: cocktails} = await axiosApi.get<Cocktail[]>(`/cocktails?user=${id}`);
  return cocktails;
});

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>('cocktails/fetchOne', async (id) => {
  const {data: cocktail} = await axiosApi.get<Cocktail>(`/cocktails/${id}`);
  return cocktail;
});

export const createCocktail = createAsyncThunk<void, CocktailMutation>('cocktails/create', async (cocktailMutation) => {
  const formData = new FormData();
  formData.append('name', cocktailMutation.name);
  if (cocktailMutation.image) {
    formData.append('image', cocktailMutation.image);
  }
  formData.append('recipe', cocktailMutation.recipe);
  formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));

  await axiosApi.post('/cocktails', formData);
});

export const changeCocktail = createAsyncThunk<void, string>('cocktails/change', async (id) => {
  await axiosApi.patch(`/cocktails/${id}/togglePublished`);
});

export const deleteCocktail = createAsyncThunk<void, string>('cocktails/delete', async (id) => {
  await axiosApi.delete(`/cocktails/${id}`);
});