"use client";
import React, { useState, useEffect } from "react";
import AddIngredient from "@/components/AddIngredient";
import IngredientContainer from "@/components/IngredientContainer";
import { useSession } from "next-auth/react";
import { getIngredients } from "@/utils/clientUtils";
import { User } from "next-auth";
const INGREDIENTS: string[] = [
  "salt",
  "pepper",
  "ground beef",
  "chicken breast",
];
interface TokenSession {
  token: string;
  user: User;
}

export default function Ingredients() {
  const { data: session, status } = useSession();
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const getIngredientsFromServer = async () => {
      if (session?.token) {
        const ingredients = await getIngredients(session.token);
        setIngredients(ingredients);
      }
    };
    getIngredientsFromServer();
  }, [session]);
  return (
    <main className="flex min-h-screen flex-col pt-4 items-center">
      <div className="mb-2 font-main font-black tracking-tighter text-2xl">
        Add or Remove Ingredients
      </div>
      {session?.token ? (
        <>
          <AddIngredient
            setIngredients={setIngredients}
            ingredients={ingredients}
            token={session.token}
          />
          <IngredientContainer
            setIngredients={setIngredients}
            mode="default"
            ingredients={ingredients}
            token={session.token}
          />
        </>
      ) : null}
    </main>
  );
}
