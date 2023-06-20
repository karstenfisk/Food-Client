import React, { FC } from "react";
import instance from "@/instance";

type IngredientContainerProps = {
  mode: "default" | "generator";
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  token: string;
};

const IngredientContainer: FC<IngredientContainerProps> = ({
  mode,
  ingredients,
  setIngredients,
  token,
}) => {
  const handleDeleteIngredient = async (ingredient: string) => {
    try {
      const { data } = await instance.delete(
        `/meals/ingredients/${ingredient}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setIngredients(data);
      }
    } catch (e) {
      console.log("Error deleting ingredient");
    }
  };

  return (
    <div
      className={
        mode === "default"
          ? "border shadow-sm rounded-2xl w-10/12 sm:w-8/12 md:w-7/12 lg:w-1/3 py-1 px-2 flex flex-wrap  items-center mt-2 pt-2"
          : ""
      }
    >
      {ingredients.length === 0 ? (
        <div className="mb-1 pl-2">No ingredients added...</div>
      ) : (
        <>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-full py-1 px-3 mr-2 mb-2 flex-1 whitespace-nowrap max-w-5/12"
            >
              <span className="mr-2">{ingredient}</span>
              {mode === "default" && (
                <button
                  type="button"
                  className="ml-auto"
                  onClick={() => handleDeleteIngredient(ingredient)}
                  aria-label="Add Ingredient"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default IngredientContainer;
