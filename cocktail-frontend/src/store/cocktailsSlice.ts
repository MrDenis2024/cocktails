import {createSlice} from '@reduxjs/toolkit';
import {Cocktail} from '../types';
import {changeCocktail, deleteCocktail, fetchCocktails, fetchMyCockTails} from './cocktailsThunks';

export interface CocktailsState {
  fetchCocktailsLoading: boolean;
  cocktails: Cocktail[];
  myCocktails: Cocktail[];
  myCocktailsFetchLoading: boolean;
  changeLoadingCocktail: false | string;
  deleteLoadingCocktail: false | string;
}

const initialState: CocktailsState = {
  fetchCocktailsLoading: false,
  cocktails: [],
  myCocktails: [],
  myCocktailsFetchLoading: false,
  changeLoadingCocktail: false,
  deleteLoadingCocktail: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state: CocktailsState) => {
      state.fetchCocktailsLoading = true;
    }).addCase(fetchCocktails.fulfilled, (state: CocktailsState, {payload: cocktails}) => {
      state.fetchCocktailsLoading = false;
      state.cocktails = cocktails;
    }).addCase(fetchCocktails.rejected, (state: CocktailsState) => {
      state.fetchCocktailsLoading = false;
    });

    builder.addCase(changeCocktail.pending, (state: CocktailsState, {meta: {arg: cocktail}}) => {
      state.changeLoadingCocktail = cocktail;
    }).addCase(changeCocktail.fulfilled, (state: CocktailsState) => {
      state.changeLoadingCocktail = false;
    }).addCase(changeCocktail.rejected, (state: CocktailsState) => {
      state.changeLoadingCocktail = false;
    });

    builder.addCase(deleteCocktail.pending, (state: CocktailsState, {meta: {arg: cocktail}}) => {
      state.deleteLoadingCocktail = cocktail;
    }).addCase(deleteCocktail.fulfilled, (state: CocktailsState) => {
      state.deleteLoadingCocktail = false;
    }).addCase(deleteCocktail.rejected, (state: CocktailsState) => {
      state.deleteLoadingCocktail = false;
    });

    builder.addCase(fetchMyCockTails.pending, (state: CocktailsState) => {
      state.myCocktailsFetchLoading = true;
    }).addCase(fetchMyCockTails.fulfilled, (state: CocktailsState, {payload: cocktail}) => {
      state.myCocktails = cocktail;
      state.myCocktailsFetchLoading = false;
    }).addCase(fetchMyCockTails.rejected, (state: CocktailsState) => {
      state.myCocktailsFetchLoading = false;
    });
  },
  selectors: {
    selectorFetchCocktailLoading: (state: CocktailsState) => state.fetchCocktailsLoading,
    selectorCocktails: (state: CocktailsState) => state.cocktails,
    selectorChangeLoadingCocktail: (state: CocktailsState) => state.changeLoadingCocktail,
    selectorDeleteLoadingCocktail: (state: CocktailsState) => state.deleteLoadingCocktail,
    selectorMyCocktails: (state: CocktailsState) => state.myCocktails,
    selectorMyCocktailsFetchLoading: (state: CocktailsState) => state.myCocktailsFetchLoading,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const {
  selectorFetchCocktailLoading,
  selectorCocktails,
  selectorChangeLoadingCocktail,
  selectorDeleteLoadingCocktail,
  selectorMyCocktails,
  selectorMyCocktailsFetchLoading,
} = cocktailsSlice.selectors;