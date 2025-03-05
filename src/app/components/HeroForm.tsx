
import React, { ReactElement } from "react";



function HeroForm() {

  


  return (
    <form   name="search-architeture" >
      <input
        type="search"
        placeholder="Search"
        className="min-w-[280px] rounded-l-lg border px-3 py-[11px] text-black shadow-xl focus:border-[#FFB200] focus:outline-none"
      />
      <button type="submit" className="rounded-r-lg bg-[#151B54] px-6 py-3 font-semibold"  >
        Search
      </button>
    </form>
  );
}

export default HeroForm;
