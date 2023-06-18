"use client";
import React, { useState, useEffect } from "react";
import AddIngredient from "@/components/AddIngredient";
import IngredientContainer from "@/components/IngredientContainer";

const INGREDIENTS: string[] = [
  "salt",
  "pepper",
  "ground beef",
  "chicken breast",
];

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<string[]>(INGREDIENTS);
  return (
    <main className="flex min-h-screen flex-col pt-4 items-center">
      <div className="mb-2 font-main font-black tracking-tighter text-2xl">
        Add or Remove Ingredients
      </div>
      <AddIngredient
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
      <IngredientContainer
        setIngredients={setIngredients}
        mode="default"
        ingredients={ingredients}
      />
    </main>
  );
}
