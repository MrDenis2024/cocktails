import {createSlice} from '@reduxjs/toolkit';

export interface CocktailsState {
  fetchCocktailsLoading: boolean;
}

const initialState: CocktailsState = {
  fetchCocktailsLoading: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  selectors: {
    selectorFetchCocktailLoading: (state: CocktailsState) => state.fetchCocktailsLoading,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const {
  selectorFetchCocktailLoading,
} = cocktailsSlice.selectors;