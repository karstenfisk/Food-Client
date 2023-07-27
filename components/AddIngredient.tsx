"use client";
import React, { useState } from "react";
import instance from "@/instance";
import { AddIngredientProps } from "@/app/types";

const AddIngredient: React.FC<AddIngredientProps> = ({
  setIngredients,
  ingredients,
  token,
}) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyboardInputSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  const handleButtonClickSubmit = () => {
    handleInputSubmit();
  };

  const handleInputSubmit = async () => {
    const formattedInput = input.trim().toLowerCase();
    if (
      formattedInput &&
      !ingredients.includes(formattedInput) &&
      formattedInput.length > 0
    ) {
      try {
        const { data } = await instance.post(
          "/meals/ingredients",
          {
            name: formattedInput,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.name) {
          setIngredients((prevIngredients) => [...prevIngredients, data.name]);
        }
      } catch (e) {
        console.log("Error adding ingredient");
      }
    }
    setInput("");
  };

  return (
    <div className="border shadow-md rounded-2xl w-10/12 sm:w-8/12 md:w-7/12 lg:w-1/3 py-1 px-2 flex h-auto items-center">
      <input
        type="text"
        className="w-full outline-none text-gray-900 placeholder-gray-400 border-none p-0 m-1 focus:outline-none focus:border-transparent focus:ring-0"
        placeholder="Enter ingredient name..."
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyboardInputSubmit}
      />
      <button
        type="button"
        className="p-1 ml-auto"
        onClick={handleButtonClickSubmit}
        aria-label="Add Ingredient"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-500 hover:scale-105"
          role="img"
          aria-hidden="true"
        >
          <title>Add Ingredient</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="sr-only">Add Ingredient</span>
      </button>
    </div>
  );
};

export default AddIngredient;
