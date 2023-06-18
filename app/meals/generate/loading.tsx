export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-4 animate-pulse">
      <div className="mb-2 font-main font-black tracking-tighter text-2xl rounded w-40 h-6">
        Meal Generator
      </div>

      <form className="p-4 space-y-2 shadow-md w-full md:w-1/2 lg:w-1/3 rounded-lg border border-gray-200 h-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 bg-gray-500 rounded w-full"></div>
        </div>

        <div className="h-10 bg-gray-500 rounded w-full mt-4"></div>

        <div className="w-full flex justify-center items-center pt-2">
          <div className="rounded-3xl relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white h-10 w-full"></div>
        </div>
      </form>
    </main>
  );
}
