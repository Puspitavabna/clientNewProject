const SkeletonCard = () => {
  return (
    <div className="w-80 p-4 bg-white shadow-md rounded-lg animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 rounded-md"></div>
      
      {/* Title Skeleton */}
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded-md"></div>
      
      {/* Description Skeleton */}
      <div className="mt-2 h-4 w-full bg-gray-300 rounded-md"></div>
      <div className="mt-2 h-4 w-5/6 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default SkeletonCard;