import GenerateRecipe from "@/components/GenerateRecipe";

export default function Generate() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-4">
      <div className="mb-2 font-main font-black tracking-tighter text-2xl">
        Meal Generator
      </div>
      <GenerateRecipe />
    </main>
  );
}
