"use client";
import React, { useState } from "react";
import instance from "@/instance";
import { useRouter } from "next/navigation";
import createToken from "@/token";

interface Macros {
  carbs: string | null;
  protein: string | null;
  fats: string | null;
  calories: string | null;
}

interface Recipe {
  diet: string;
  prepTime: string;
  cuisine: string;
  ingredients: string[];
  macros: Macros;
  servings: number;
  type: string;
}

interface Meal {
  title: string;
  ingredients: string[];
  instructions: string[];
  macros: Macros;
}

function GenerateRecipe() {
  const [diet, setDiet] = useState<string>("Any");
  const [prepTime, setPrepTime] = useState<string>("Any");
  const [cuisine, setCuisine] = useState<string>("Any");
  const [protein, setProtein] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [servings, setServings] = useState<number>(1);
  const [mealType, setMealType] = useState<string>("Any");
  const [radioValue, setRadioValue] = useState<string>("Any");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const macros: Macros = {
      protein:
        protein !== 0
          ? `approximately ${protein} grams of protein per serving, `
          : null,
      carbs:
        carbs !== 0
          ? `approximately ${carbs} grams of carbs per serving, `
          : null,
      fats:
        fat !== 0 ? `approximately ${fat} grams of fat per serving, ` : null,
      calories: calories !== 0 ? `calories` : null,
    };

    const recipe: Recipe = {
      diet,
      prepTime,
      cuisine,
      ingredients: [],
      macros,
      servings,
      type: mealType,
    };
    setLoading(true);
    try {
      const { data } = await instance.post("/meals/generate", recipe);
      const token = createToken({ meal: data });
      router.push(`/meals/recipe?meal=${token}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center pt-24">
          <div className="animate-pulse bg-sky-400 text-white font-semibold py-2 px-4 rounded-full">
            Please wait while we generate your meal...
          </div>
        </div>
      ) : (
        <form
          className="p-4 space-y-2 shadow-md w-100 rounded-lg border border-gray-200 h-auto"
          onSubmit={handleSubmit}
        >
          <div className="columns-2">
            {/* Diet Dropdown */}
            <div>
              <label
                htmlFor="diet"
                className="block text-sm font-medium text-gray-700"
              >
                Diet
              </label>
              <select
                id="diet"
                name="diet"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="pescatarian">Pescatarian</option>
              </select>
            </div>
            {/* Prep Time Dropdown */}
            <div>
              <label
                htmlFor="prepTime"
                className="block text-sm font-medium text-gray-700"
              >
                Prep Time
              </label>
              <select
                id="prepTime"
                name="prepTime"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="under 15">Fast (&lt;15 minutes)</option>
                <option value="15-30">Short (15-30 minutes)</option>
                <option value="30-60">Medium (30-60 minutes)</option>
                <option value="60-120">Long (1-2 hours)</option>
              </select>
            </div>
            {/* Cuisine Dropdown */}
            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-gray-700"
              >
                Cuisine
              </label>
              <select
                id="cuisine"
                name="cuisine"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="american">American</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
            {/* Protein Input */}
            <div>
              <label
                htmlFor="protein"
                className="block text-sm font-medium text-gray-700"
              >
                Protein (grams)
              </label>
              <input
                type="number"
                min="0"
                id="protein"
                name="protein"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={protein}
                onChange={(e) => setProtein(parseInt(e.target.value))}
              />
            </div>
            {/* Carbohydrates Input */}
            <div className="mb-1">
              <label
                htmlFor="carbohydrates"
                className="block text-sm font-medium text-gray-700"
              >
                Carbohydrates (grams)
              </label>
              <input
                type="number"
                min="0"
                id="carbohydrates"
                name="carbohydrates"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={carbs}
                onChange={(e) => setCarbs(parseInt(e.target.value))}
              />
            </div>
            {/* Fats Input */}
            <div>
              <label
                htmlFor="fats"
                className="block text-sm font-medium text-gray-700"
              >
                Fats (grams)
              </label>
              <input
                type="number"
                min="0"
                id="fats"
                name="fats"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={fat}
                onChange={(e) => setFat(parseInt(e.target.value))}
              />
            </div>
            {/* Calories Input */}
            <div>
              <label
                htmlFor="calories"
                className="block text-sm font-medium text-gray-700"
              >
                Calories
              </label>
              <input
                type="number"
                min="0"
                id="calories"
                name="calories"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={calories}
                onChange={(e) => setCalories(parseInt(e.target.value))}
              />
            </div>
            {/* Servings Input */}
            <div>
              <label
                htmlFor="servings"
                className="block text-sm font-medium text-gray-700"
              >
                Servings
              </label>
              <input
                type="number"
                min="1"
                max="10"
                id="servings"
                name="servings"
                className="mt-1 block w-full py-1 px-2 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value))}
              />
            </div>
            {/* Meal Type Radio Button Group */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Meal Type
              </span>
              <div className="space-y-1">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="mealType"
                      value="Any"
                      checked={radioValue === "Any"}
                      onChange={() => setRadioValue("Any")}
                    />
                    <span className="ml-2 text-sm">Any</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="mealType"
                      value="Breakfast"
                      checked={radioValue === "Breakfast"}
                      onChange={() => setRadioValue("Breakfast")}
                    />
                    <span className="ml-2 text-sm">Breakfast</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="mealType"
                      value="Lunch"
                      checked={radioValue === "Lunch"}
                      onChange={() => setRadioValue("Lunch")}
                    />
                    <span className="ml-2 text-sm">Lunch</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="mealType"
                      value="Dinner"
                      checked={radioValue === "Dinner"}
                      onChange={() => setRadioValue("Dinner")}
                    />
                    <span className="ml-2 text-sm">Dinner</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center pt-2">
            <button className="rounded-3xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-whit">
              <span className="relative px-10 py-2 transition-all ease-in duration-75 bg-white rounded-3xl group-hover:bg-opacity-0">
                Create My Meal!
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default GenerateRecipe;
