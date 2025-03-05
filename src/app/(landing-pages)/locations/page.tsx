// pages/index.js
import CountryCard from "@/src/app/components/CountryCard";
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
//import { SERVER_URL } from "@/src/app/constants/api";
import { env } from "../../../../config/env";
import skyfaced from "/public/skyfaced.jpg";

async function getData() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/landingpage/locations`,
      {
        method: "GET", // Ensure the method matches what works in Postman
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    return []
  }
}
async function locations() {
  const countries = [
    {
      _id: "string",
      flag: '/usa-flag.png',
      name: 'United Street',
      address: `Enrico Murasari Boulevard\nMezquital 57723, Murod\n99-28291`,
      phone: '00201141139351',
      email: 'ABC@apple.com',
      url: 'https://facebook.com',
      link: [
        { platform: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
        { platform: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
        { platform: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram' },
        { platform: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
      ],
      isactive: true,
      createdAt: new Date(),
    },
  ];
  
  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="GLOBAL BRANCHES" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>


      <main className="flex min-h-screen flex-col items-center justify-between bg-tertiary p-14">
        <div className="mb-8 grid grid-cols-4 gap-x-4 p-2">
          {countries.map((country, index) => (
            <CountryCard data={country} key={index} />
          ))}
          {/* {data?.map((d: any, i: any) => (
            <CountryCard key={i} data={d} />
          ))} */}
        </div>
        <Paginate />
      </main>
    </>
  );
}

export default locations;
