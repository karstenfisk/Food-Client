"use client";
import React from "react";
import instance from "@/instance";

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
      // Make the API request to save the meal
      const response = await instance.post(
        `/meals/save`,
        { recipe: meal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Saving was successful
        console.log("Meal saved successfully!");
      } else {
        // Saving failed
        console.error("Failed to save meal.");
      }
    } catch (error) {
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
