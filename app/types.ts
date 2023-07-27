import { User } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import IngredientsToggle from "../components/IngredientsToggle";

export interface TokenSession {
  token: string;
  user: User;
}

export interface Macros {
  carbs: string | null;
  protein: string | null;
  fats: string | null;
  calories: string | null;
}

export interface SavedMeal {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  protein: string | null;
  fats: string | null;
  carbohydrates: string | null;
  calories: number | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Meal {
  title: string;
  ingredients: string[];
  instructions: string[];
  macros: Macros;
}

export interface Recipe {
  diet: string;
  prepTime: string;
  cuisine: string;
  ingredients: boolean;
  macros: Macros;
  servings: number;
  type: string;
}

export interface ISearchParams {
  [key: string]: string | undefined;
}

export interface Session {
  user: User;
  token: string;
}

export interface Error {
  message: string;
}

export interface SavedMeal {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  protein: string | null;
  fats: string | null;
  carbohydrates: string | null;
  calories: number | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AddIngredientProps {
  setIngredients: Dispatch<SetStateAction<string[]>>;
  ingredients: string[];
  token: string;
}

export interface IngredientContainerProps {
  mode: "default" | "generator";
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;
  token: string;
}

export interface SaveButtonProps {
  token: string;
  meal: Meal;
}

export interface RecipeProps {
  recipes?: SavedMeal[];
}

export interface IngredientsToggleProps {
  setIngredients: Dispatch<SetStateAction<boolean>>;
  ingredients: boolean;
}

export interface GenerateRecipeProps {
  sessionToken: string;
}
