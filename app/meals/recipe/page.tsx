import { verifyToken } from "@/token";
import RecipePage from "@/components/Recipe";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../options";
import SaveButton from "@/components/SaveButton";
import { redirect } from "next/navigation";

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

interface Recipe {
  diet: string;
  prepTime: string;
  cuisine: string;
  ingredients: string[];
  macros: Macros;
  servings: number;
  type: string;
}

interface ISearchParams {
  [key: string]: string | undefined;
}

interface Session {
  user: User;
  token: string;
}

interface Error {
  message: string;
}

const createResponse = (
  meal: Meal | null,
  isSaved: boolean | null,
  error: Error | null
) => ({ meal, isSaved, error });

async function getMealFromToken(token: string) {
  const val: any = verifyToken(token);
  if (!val?.meal) redirect("/meals/generate");
  return val?.meal ? val.meal : null;
}

async function getMealFromServer(id: string, token: string) {
  const res = await fetch(`${process.env.API_BASE}/meals/saved/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.ok && data) {
    const serverMeal: Meal = {
      title: data.title,
      ingredients: data.ingredients,
      instructions: data.instructions,
      macros: {
        carbs: data.carbohydrates,
        protein: data.protein,
        fats: data.fats,
        calories: data.calories.toString(),
      },
    };
    return serverMeal;
  }
  return null;
}

async function getRecipe(searchParams?: ISearchParams) {
  let isSaved: boolean | null = null;
  let meal: Meal | null = null;
  let error: Error | null = null;

  if (searchParams?.meal) {
    meal = await getMealFromToken(searchParams.meal);
    isSaved = false;
    error = meal ? null : { message: "Meal not found" };
  } else if (searchParams?.id) {
    const session: Session | null = await getServerSession(authOptions);
    if (session?.token) {
      meal = await getMealFromServer(searchParams.id, session.token);
      isSaved = meal ? true : false;
      error = meal ? null : { message: "Meal not found" };
    } else {
      redirect("/login");
    }
  } else if (!searchParams?.id && !searchParams?.meal) {
    redirect("/meals/generate");
  }

  return createResponse(meal, isSaved, error);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: ISearchParams;
}) {
  const { meal, isSaved, error } = await getRecipe(searchParams);
  const session: Session | null = await getServerSession(authOptions);

  return (
    <>
      {!meal ? (
        <h1>Invalid or missing Meal</h1>
      ) : meal?.title &&
        meal?.ingredients &&
        meal?.instructions &&
        meal?.macros ? (
        <div>
          <RecipePage meal={meal} />
          {!isSaved && session?.token ? (
            <SaveButton token={session?.token} meal={meal} />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
