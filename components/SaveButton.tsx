"use client";
import React from "react";
import instance from "@/instance";
import { AxiosError } from "axios";

interface Macros {
  carbs: string | null;
  protein: string | null;
  fats: string | null;
  calories: string | null;
}

interface Meal {
  title: string;
  ingredients: string[];
  instructions: string[];
  macros: Macros;
}

interface SaveButtonProps {
  token: string;
  meal: Meal;
}

const SaveButton: React.FC<SaveButtonProps> = ({ token, meal }) => {
  const handleSave = async () => {
    try {
      console.log(meal);
      // Make the API request to save the meal
      const response = await instance.post(
        `/meals/save`,
        {
          recipe: meal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Saving was successful
        console.log("Meal saved successfully!");
      }
    } catch (error: AxiosError | any) {
      if (error?.response?.data?.error === "Recipe already exists") {
        alert("Recipe has already been saved!");
      }
      console.error("Error saving meal:", error);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSave}
    >
      Save Meal
    </button>
  );
};

export default SaveButton;
