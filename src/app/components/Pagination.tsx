"use client";
import { useState } from "react";

function Paginate() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 97;
  const resultsPerPage = 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg text-center">
        <p className="mb-1 text-sm font-semibold text-black">
          Showing {startResult} To {endResult} of {totalResults} Results
        </p>
        <button
          onClick={handleNext}
          className="mt-2 rounded-md border-2 border-gray-800 bg-[#0059FF] px-6 py-2 text-[10px] font-semibold text-white hover:bg-[#0059ffa2]"
        >
          More Results
        </button>
      </div>
    </div>
  );
}

export default Paginate;
