export default function Loading() {
  return (
    <div className="mt-12 p-4 space-y-4 shadow-md w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 h-auto animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>

      <div className="space-y-2 mt-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      <div className="space-y-2 mt-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      <div className="space-y-2 mt-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
