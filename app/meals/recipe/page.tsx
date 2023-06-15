import { verifyToken } from "@/token";
import RecipePage from "@/components/Recipe";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../options";
import SaveButton from "@/components/SaveButton";

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

interface Session {
  user: User;
  token: string;
}

async function getRecipe(recipe: Recipe) {
  console.log("called", recipe);
  const res = await fetch(`${process.env.API_BASE}/meals/generate`, {
    method: "POST",
    body: JSON.stringify(recipe),
  });

  const meal: Meal = await res.json();

  // Handle the response from the API
  if (res.ok && meal) {
    return meal;
  } else {
    return undefined;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const session: Session | null = await getServerSession(authOptions);
  const decoded: any | undefined = verifyToken(searchParams?.recipe);
  const recipe: Recipe | undefined = decoded?.recipe
    ? JSON.parse(decoded.recipe)
    : undefined;

  const meal = recipe?.diet ? await getRecipe(recipe) : null;
  console.log(meal);

  return (
    <>
      {" "}
      {!recipe ? (
        <h1>No recipe Provided</h1>
      ) : meal?.title &&
        meal?.ingredients &&
        meal?.instructions &&
        meal?.macros ? (
        <div>
          <RecipePage meal={meal} />
          {session?.token ? (
            <SaveButton token={session.token} meal={meal} />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
