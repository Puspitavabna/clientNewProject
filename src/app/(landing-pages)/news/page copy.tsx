import Hero from "@/src/app/components/Hero";
import HeroForm from "@/src/app/components/HeroForm";
import Line from "@/src/app/components/Line";
import Paginate from "@/src/app/components/Pagination";
import NewsCard from "@/src/app/components/NewsCard";
import skyfaced from "/public/skyfaced.jpg";
//import { SERVER_URL } from "@/src/app/constants/api";
//import ArchitectureDataProps from "../architecture/definition"
import BlogCard from "@/src/app/components/BlogCard";
import { env } from "../../../../config/env";




// Get the current date details
const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('default', { month: 'short' }); // Abbreviated month (e.g., "Dec")
const currentDay = currentDate.getDate(); // Current day (e.g., 1)
const currentYear = currentDate.getFullYear(); // Current year (e.g., 2024)

async function getData() {
  //const res = await fetch(`${SERVER_URL}/user/project`);
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/landingpage/blog`);


  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// function News() {
//   let news = new Array(12).fill(undefined);

async function News() {
  const { data } = await getData();

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-[#CCCCFF] px-10 pb-10">
        <Hero image={skyfaced}>
          {/* <Line /> */}
          <h1 className="hero-heading">
            OUR
            <span className="text-[#ffb200]"> lATEST NEWS</span>
          </h1>
          <h2 className="font-normal">Stay informed with the latest updates, announcements, and events</h2>

          <HeroForm />
        </Hero>

        <div className="relative z-30 flex justify-center rounded">
          <div className="absolute left-[0px] bottom-[-70px] z-30 flex justify-center rounded">
            <div className="relative flex flex-col p-4 items-center space-y-0 border bg-white border-[#000000] w-[234px] h-[55px] overflow-visible rounded">
              {/* Top Lines */}
              {/* <div className="flex space-x-8 justify-center">
                <div className="border-t  border-[#000000] w-8"></div>
                <div className="border-t  border-[#000000] w-8"></div>
                <div className="border-t  border-[#000000] w-8"></div>
              </div> */}

              {/* Content */}
              <div className="flex items-center space-x-8 justify-center">
                {/* Nov */}
                <div className="flex flex-col items-center p-0">
                  <div className="border-t  border-[#000000] w-10"></div>
                  <div className="font-light text-[#000000] mt-2">{currentMonth} </div>
                  <div className="border-t  border-[#000000] w-10 -mt-1.5"></div>
                </div>

                {/* 10 */}
                <div className="flex flex-col items-center p-0">
                  <div className="border-t  border-[#000000] w-10"></div>
                  <div className="font-light text-[#000000] mt-2">{currentDay}</div>
                  <div className="border-t  border-[#000000] w-10 -mt-1.5"></div>
                </div>

                {/* 2024 */}
                <div className="flex flex-col items-center p-0">
                  <div className="border-t  border-[#000000] w-10"></div>
                  <div className="font-light text-[#000000] mt-2">{currentYear}</div>
                  <div className="border-t  border-[#000000] w-10 -mt-1.5"></div>
                </div>
              </div>

              {/* Bottom Lines */}
              {/* <div className="flex space-x-8 justify-center -mt-1">
                <div className="border-t  border-[#000000] w-8"></div>
                <div className="border-t  border-[#000000] w-8"></div>
                <div className="border-t  border-[#000000] w-8"></div>
              </div> */}
            </div>
          </div>
        </div>

      </header>

      <main className="bg-gradient-to-br from-[#F2E6C9] to-[#F2E6C9] pt-14 pr-8 pl-8 pb-20">
        <div className="mb-20 grid grid-cols-4 gap-6">
          {/* {data.map((d: any, i: number) => (
          <NewsCard data={d} key={d._id}  />
        ))} */}

          {data.map((d: any, i: number) => (
            <BlogCard data={d} key={d._id} />
          ))}

        </div>
        <Paginate />
      </main>
    </>
  );
}

export default News;
