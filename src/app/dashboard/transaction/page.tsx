import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NavLink from "@/src/app/(auth)/NavLink";
import Link from "next/link";

function page() {
 

  return (
    <section className="rounded-xl py-5 px-6">
     
      <header className="flex justify-between items-center mt-3 mb-7">
        <h1 className="text-2xl font-bold">Transaction List</h1>
        <div>
          <input
            type="search"
            placeholder="Search here..."
            className="py-3 border rounded-lg shadow-xl px-3 mr-2 focus:outline-none focus:border-[#FFB200] min-w-[280px]"
          />
          <button className="py-3 px-6 bg-[#FFB200] font-semibold rounded-lg">
            Search
          </button>
        </div>
      </header>

      <table className="w-full text-sm rounded-lg mt-4 border border-[#FFB200]">
        <thead className="bg-[#FFB200]">
          <tr>
            <th className="py-6 w-[8%]">No.</th>
            <th className="w-[12%]">Transaction ID</th>
            <th className="w-[12%]">Project Name</th>
            <th className="w-[12%]">Amount</th>
            <th className="w-[12%]">Transaction Date</th>
            </tr>
        </thead>
        <tbody className="text-center border border-[#FFB200]">
          <tr className="odd:bg-[#FAEFD8] even:bg-white">
            <td className="py-6 border-r border-r-[#FFB200]">
              <span className="rounded px-2 py-1 bg-[#FFB200] font-semibold">
                1
              </span>
            </td>
            <td className="border-r border-r-[#FFB200]">4562</td>
            <td className="border-r border-r-[#FFB200]">Web dev</td>
            <td className="border-r border-r-[#FFB200]">110 USD</td>
            <td className="border-r border-r-[#FFB200]">03-02-25</td>
          </tr>
        </tbody>
      </table>
      <footer className="bg-white py-6 flex justify-between px-4 text-sm">
        <div>
          <p className="font-bold">Showing 1 to 5 of 97 results</p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaArrowLeft className="text-[#FFB200]" />
          <button className="rounded-full h-6 w-6 bg-[#FFB200] text-white flex items-center justify-center text-xs font-semibold">
            1
          </button>
          <button className="rounded-full h-6 w-6 bg-[#FFF2D4] text-black font-semibold flex items-center justify-center text-xs">
            2
          </button>
          <FaArrowRight className="text-[#FFB200]" />
        </div>
      </footer>
    </section>
  );
}

export default page;
