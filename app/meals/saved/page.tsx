import { getServerSession, User } from "next-auth";
import { authOptions } from "../../options";
import { redirect } from "next/navigation";
import RecipeList from "@/components/SavedRecipe";

interface Session {
  user: User;
  token: string;
}

interface Meal {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  protein: string | null;
  fats: string | null;
  carbohydrates: string | null;
  calories: number | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

async function getRecipes(): Promise<Meal[] | null> {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const res = await fetch(`${process.env.API_BASE}/meals/saved`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  const data = await res.json();
  if (res.ok && data) {
    const recipes: Meal[] = data;
    return recipes;
  }
  alert("Error fetching saved recipes");
  return null;
}

export default async function Saved() {
  const data: Meal[] | null = await getRecipes();
  return (
    <div className="p-12 pt-4 flex justify-center">
      {data && data?.length > 0 ? <RecipeList recipes={data} /> : null}
    </div>
  );
}
