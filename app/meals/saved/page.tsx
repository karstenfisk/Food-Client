import { getServerSession, User } from "next-auth";
import { authOptions } from "../../options";
import { redirect } from "next/navigation";
import RecipeList from "@/components/SavedRecipe";
import { Session, SavedMeal } from "@/app/types";

async function getRecipes(): Promise<SavedMeal[] | null> {
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
    const recipes: SavedMeal[] = data;
    return recipes;
  }
  alert("Error fetching saved recipes");
  return null;
}

export default async function Saved() {
  const data: SavedMeal[] | null = await getRecipes();
  return (
    <div className="p-12 pt-4 flex justify-center">
      {data && data?.length > 0 ? <RecipeList recipes={data} /> : null}
    </div>
  );
}
