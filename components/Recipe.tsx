import React from "react";
import DownloadButton from "./DownloadButton";
import { Macros, Meal } from "@/app/types";

const RecipePage: React.FC<{ meal?: Meal }> = ({ meal }) => {
  if (!meal) {
    return <h1>No recipe provided</h1>;
  }

  const { title, ingredients, instructions, macros } = meal;

  return (
    <>
      <div className="mt-12 p-4 space-y-4 shadow-md w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 h-auto">
        <h1 className="text-xl font-semibold">{title}</h1>

        <h2 className="text-lg font-medium mt-2">Ingredients:</h2>
        <ul className="list-disc ml-6 space-y-1">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-lg font-medium mt-2">Instructions:</h2>
        <ol className="list-decimal ml-6 space-y-1">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>

        <h2 className="text-lg font-medium mt-2">Macros:</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(macros).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold">{key}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <DownloadButton
        title={title}
        ingredients={ingredients}
        instructions={instructions}
        macros={macros}
      />
    </>
  );
};

export default RecipePage;
