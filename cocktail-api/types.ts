import {Model} from 'mongoose';

export interface UserFields {
  email: string;
  displayName: string;
  avatar: string;
  password: string;
  token: string;
  role: string;
  googleId?: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface Ingredient {
  ingredientName: string;
  amount: string;
}