import { GrServices } from "react-icons/gr";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";

const CopyServiceCard = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <div className="flip-card relative shadow-xl">
      <div className="flip-card-inner absolute h-fit transform transition duration-500 ease-in-out">
        <ServiceCardFront data={data} />
        <ServiceCardBack data={data} />
      </div>
    </div>
  );
};

const ServiceCardFront = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <article className="group flex h-fit flex-col items-center gap-y-2 rounded-md border border-[#B0B0B0] bg-white py-5 text-sm transition-all duration-200 hover:bg-[#ffb200]">
      <header>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffb200] transition-all duration-200 group-hover:bg-black">
          <GrServices className="text-4xl text-black transition-all duration-200 group-hover:text-[#ffb200]" />
        </div>
      </header>
      <main className="text-center">
        <h3 className="text-base font-bold">{data.title}</h3>
        <p className="text-sm">{data.description}</p>
        <button className="mt-4 rounded border border-[#ffb200] bg-transparent px-4 py-2 text-xs font-bold transition-all duration-150 group-hover:border-black group-hover:bg-black group-hover:text-white">
          LEARN MORE
        </button>
      </main>
      <footer></footer>
    </article>
  );
};

const ServiceCardBack = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <article className="group flex h-fit flex-col items-center gap-y-2 rounded-md border border-[#B0B0B0] bg-white py-5 text-sm transition-all duration-200 hover:bg-[#ffb200]">
      <header>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffb200] transition-all duration-200 group-hover:bg-black">
          <GrServices className="text-4xl text-black transition-all duration-200 group-hover:text-[#ffb200]" />
        </div>
      </header>
      <main className="text-center">
        <h3 className="text-base font-bold">{data.title}</h3>
        <p className="text-sm">{data.description}</p>

        <button className="mt-4 rounded border border-[#ffb200] bg-transparent px-4 py-2 text-xs font-bold transition-all duration-150 group-hover:border-black group-hover:bg-black group-hover:text-white">
          LEARN MORE
        </button>
      </main>
      <footer></footer>
    </article>
  );
};

export default CopyServiceCard;
