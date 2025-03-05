import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function CopyPaginate() {
  return (
    <div className="mx-auto flex w-[90%] items-center justify-between rounded-full border border-black bg-white px-4 py-2">
      <p className="text-sm font-semibold">Showing 1 to 12 of 12 results</p>
      <div className="flex items-center gap-x-2 rounded-full border border-black px-2">
        <FaArrowLeft />
        <ul className="flex border-x border-black bg-[#17255414]">
          <li className="border-r border-r-black bg-[#ffb200] p-1 px-3 last:border-none">
            1
          </li>
          <li className="border-r border-r-black p-1 px-3 last:border-none">
            2
          </li>
          <li className="border-r border-r-black p-1 px-3 last:border-none">
            3
          </li>
        </ul>
        <FaArrowRight />
      </div>
    </div>
  );
}

export default CopyPaginate;
