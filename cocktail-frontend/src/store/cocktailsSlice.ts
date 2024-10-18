import {createSlice} from '@reduxjs/toolkit';
import {Cocktail} from '../types';
import {changeCocktail, deleteCocktail, fetchCocktails, fetchMyCockTails, fetchOneCocktail} from './cocktailsThunks';

export interface CocktailsState {
  fetchCocktailsLoading: boolean;
  cocktails: Cocktail[];
  myCocktails: Cocktail[];
  cocktail: Cocktail | null;
  fetchOneLoading: boolean;
  myCocktailsFetchLoading: boolean;
  changeLoadingCocktail: false | string;
  deleteLoadingCocktail: false | string;
}

const initialState: CocktailsState = {
  fetchCocktailsLoading: false,
  cocktails: [],
  myCocktails: [],
  cocktail: null,
  fetchOneLoading: false,
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

    builder.addCase(fetchMyCockTails.pending, (state: CocktailsState) => {
      state.myCocktailsFetchLoading = true;
    }).addCase(fetchMyCockTails.fulfilled, (state: CocktailsState, {payload: cocktails}) => {
      state.myCocktails = cocktails;
      state.myCocktailsFetchLoading = false;
    }).addCase(fetchMyCockTails.rejected, (state: CocktailsState) => {
      state.myCocktailsFetchLoading = false;
    });

    builder.addCase(fetchOneCocktail.pending, (state: CocktailsState) => {
      state.cocktail = null;
      state.fetchOneLoading = true;
    }).addCase(fetchOneCocktail.fulfilled, (state: CocktailsState, {payload: cocktail}) => {
      state.fetchOneLoading = false;
      state.cocktail = cocktail;
    }).addCase(fetchOneCocktail.rejected, (state: CocktailsState) => {
      state.fetchOneLoading = false;
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
  },
  selectors: {
    selectorFetchCocktailLoading: (state: CocktailsState) => state.fetchCocktailsLoading,
    selectorCocktails: (state: CocktailsState) => state.cocktails,
    selectorChangeLoadingCocktail: (state: CocktailsState) => state.changeLoadingCocktail,
    selectorDeleteLoadingCocktail: (state: CocktailsState) => state.deleteLoadingCocktail,
    selectorMyCocktails: (state: CocktailsState) => state.myCocktails,
    selectorMyCocktailsFetchLoading: (state: CocktailsState) => state.myCocktailsFetchLoading,
    selectorFetchOneLoading: (state: CocktailsState) => state.fetchOneLoading,
    selectorCocktail: (state: CocktailsState) => state.cocktail,
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
  selectorFetchOneLoading,
  selectorCocktail,
} = cocktailsSlice.selectors;