import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Categories({ categories }: { categories: string[] }) {
  return (
    <div className="flex items-center gap-x-4">
      <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffb200] text-[#231B7D] hover:bg-[#ffb200]/90">
        <FaArrowLeft />
      </button>
      <div className="grid grow grid-cols-7 gap-x-6">
        {categories.map((category, i) => {
          return (
            <button
              key={i}
              className="grow rounded bg-white py-3 text-center text-xs font-semibold uppercase transition-all duration-150 hover:bg-black hover:text-white"
            >
              {category}
            </button>
          );
        })}
      </div>
      <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffb200] text-[#231B7D] hover:bg-[#ffb200]/90">
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Categories;
