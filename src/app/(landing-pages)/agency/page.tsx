import AgencyCard from "@/src/app/components/AgencyCard";
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "/public/skyfaced.jpg";
//import { SERVER_URL } from "@/src/app/constants/api";
import { env } from "../../../../config/env";

async function getData() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/agencies/agencies`,
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
  const body = await res.json();
  console.log(body);
  return body;
}
async function Employers() {
  const data = await getData();
  const agencyData = data.agencies;

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero
          image={skyfaced}
          title="AGENCY"
          desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and "
        />
      </header>

      {/* <main className="bg-gradient-to-br from-[#F2E6C9] to-[#F2E6C9] p-14 pb-20"> */}
      <main className="bg-[#E9F0FF] p-14 pb-20">
        <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Render each card horizontally in rows of 2 */}
          {/* {employeeData?.map((d: any, i: any) => ( */}
          {agencyData &&
            agencyData?.map((agency: any, index: number) => {
              return <AgencyCard key={index} data={agency} />;
            })}

          {/* ))} */}
        </section>
        <Paginate />
      </main>
    </>
  );
}
export default Employers;
