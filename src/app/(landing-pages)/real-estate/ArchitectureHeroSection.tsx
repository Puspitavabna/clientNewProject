"use client";

import { env } from "@/config/env";
import { useState } from "react";
import Cookies from "js-cookie";

interface ArchitectureHeroSectionProps {

  onDataLoaded:() => void
}

const ArchitectureHeroSection = () => {

  const [searchKeyWord,setSearchKeyWord] = useState<string>('')
   const userToken =  Cookies.get('token')
const  handleSearchSubmitted:React.FormEventHandler<HTMLFormElement> = (e:React.FormEvent) =>{
   e.preventDefault()

  
   console.log(searchKeyWord)
   console.log(userToken)
}

    return(
    
        <form onSubmit={handleSearchSubmitted}  >
        <input
          type="search"
          placeholder="Search"
          name="search-architure"
          onChange={(e)=>{
            setSearchKeyWord(e.target.value)
          }}
          value={searchKeyWord}
          className="min-w-[280px] rounded-l-lg border px-3 py-[11px] text-black shadow-xl focus:border-[#FFB200] focus:outline-none"
        />
        <button type="submit" className="rounded-r-lg bg-[#151B54] px-6 py-3 font-semibold"  >
          Search
        </button>
      </form>

    );
}


export default ArchitectureHeroSection