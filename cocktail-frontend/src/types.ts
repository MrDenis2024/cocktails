export interface User {
  _id: string;
  email: string;
  displayName: string;
  avatar: string;
  token: string;
  role: string;
  googleId?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Ingredient {
  _id: string
  ingredientName: string;
  amount: string;
}

export interface Cocktail {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export interface IngredientMutation {
  ingredientName: string;
  amount: string;
}

export interface CocktailMutation {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: IngredientMutation[];
}