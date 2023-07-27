"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { RecipeProps } from "@/app/types";

const RecipeList: React.FC<RecipeProps> = ({ recipes }) => {
  if (!recipes) {
    return <div className="p-4 md:w-3/4 max-w-2xl"></div>;
  }

  return (
    <div className="p-4 md:w-3/4 max-w-2xl ">
      {recipes.map((recipe) => (
        <Link href={`/meals/recipe?id=${recipe.id}`} key={recipe.id}>
          <div className="m-5 p-4 bg-gray-50 shadow rounded">
            <h2 className="font-bold text-xl mb-2">{recipe.title}</h2>
            <p>Protein: {recipe.protein}</p>
            <p>Fats: {recipe.fats}</p>
            <p>Carbs: {recipe.carbohydrates}</p>
            <p>Calories: {recipe.calories}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
