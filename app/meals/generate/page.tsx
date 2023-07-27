import GenerateRecipe from "@/components/GenerateRecipe";
import { getServerSession } from "next-auth";
import { Session } from "@/app/types";
import { authOptions } from "@/app/options";

export default async function Generate() {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <>
      {session?.token ? (
        <main className="flex min-h-screen flex-col items-center pt-4">
          <div className="mb-2 font-main font-black tracking-tighter text-2xl">
            Meal Generator
          </div>
          <GenerateRecipe sessionToken={session.token} />
        </main>
      ) : null}
    </>
  );
}
