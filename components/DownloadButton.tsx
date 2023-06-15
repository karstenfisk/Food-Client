"use client";
import React from "react";
import { saveAs } from "file-saver";

interface Macros {
  carbs: string | null;
  protein: string | null;
  fats: string | null;
  calories: string | null;
}

interface DownloadButtonProps {
  title: string;
  ingredients: string[];
  instructions: string[];
  macros: Macros;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  title,
  ingredients,
  instructions,
  macros,
}) => {
  const handleDownload = () => {
    const content = `
      Title: ${title}
      
      Ingredients:
      ${ingredients.map((ingredient) => `• ${ingredient}`).join("\n")}
      
      Instructions:
      ${instructions
        .map((instruction, index) => `${index + 1}. ${instruction}`)
        .join("\n")}
      
      Macros:
      ${Object.entries(macros)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "recipe.txt");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDownload}
    >
      Download
    </button>
  );
};

export default DownloadButton;
