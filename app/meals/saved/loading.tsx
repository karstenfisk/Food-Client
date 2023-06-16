export default function Loading() {
  const recipes = [1, 2, 3, 4, 5];
  return (
    <div className="p-12 pt-4 flex justify-center">
      <div className="p-4 md:w-3/4 max-w-2xl">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            role="status"
            className="m-5 p-4 bg-gray-50 shadow rounded animate-pulse"
          >
            <div className="h-6 bg-gray-500 rounded w-1/2 mb-2"></div>
            <p className="h-3 bg-gray-400 rounded w-28 mb-2"></p>
            <p className="h-3 bg-gray-400 rounded w-24 mb-2"></p>
            <p className="h-3 bg-gray-400 rounded w-20 mb-2"></p>
            <p className="h-3 bg-gray-400 rounded w-16 mb-2"></p>
          </div>
        ))}
      </div>
    </div>
  );
}
