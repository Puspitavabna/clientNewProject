import Image from "next/image";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";
import Line from "./Line";
import Overlay from "./Overlay";
import canoe from "/public/canoe.jpg";
import ceiling from "/public/ceiling.jpg";

export default function FeaturesCard({
  image,
  data,
}: {
  image: any;
  data: ArchitectureDataProps;
}) {
  return (
    <div className="flip-card relative shadow-xl">
      <div className="flip-card-inner absolute h-fit transform transition duration-500 ease-in-out">
        <FeaturesCardFront  data={data} />
        <FeaturesCardBack data={data} />
      </div>
    </div>
  );
}

// {/* <article className="relative flex h-[400px] w-full flex-col rounded-md custom-shadow">
//       <header className="relative h-full grow">

//         <Image
//           alt="Mountains"
//           src={canoe}
//           placeholder="blur"
//           quality={100}
//           fill
//           sizes="100vw"
//           style={{
//             objectFit: "cover",
//           }}
//         />
//         {/* <Overlay /> */}
//         <FeatureTag price={data.price} />

//         <div className="absolute bottom-6 left-6 z-30 grid">
//           <Line width="57.75px" />
//           <p className="text-white mt-2">
//             {formatISODateString(data.createdAt)}
//           </p>
//           <p className="font-bold capitalize text-white">
//             {data.title}
//           </p>
//         </div>
//       </header>

//       <div className="bg-white px-6 py-6 text-sm text-[#727272]"> */}
//         {/* <main>
//            <p className="mb-3 tracking-wider">
//             {formatISODateString(data.createdAt)}
//           </p>
//           <button className="mb-4 w-full rounded bg-[#ffb200] py-3 text-xs font-semibold text-black">
//             SEE PLAN
//           </button>
//         </main> */}

//         <footer className="flex items-center gap-x-4">
//           <div>
//             <span className="font-bold">Project Planning</span>
//             <ul className="mb-4 flex flex-col gap-y-1 text to-black">
//               <li>
//                 <span className="">House:</span> 1200 sq ft. house
//               </li>
//               <li>
//                 <span className="">Kitchens:</span> 2
//               </li>
//               <li>
//                 <span className="">Bedrooms:</span> 3
//               </li>
//               <li>
//                 <span className="">Balconies:</span> 1
//               </li>
//             </ul>
//           </div>
//           {/* <div className="flex items-center gap-x-2">
//             <IoEyeSharp className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.view}</p>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <IoMdShare className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.share}</p>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <CiHeart className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.favourite}</p>
//           </div> */}
//         </footer>
//       </div>
//     </article>

//   );
// }

const FeaturesCardFront = ({
  // image,
  data,
}: {
  // image: any;
  data: ArchitectureDataProps;
}) => {
  return (
    <article className="flip-card-front absolute flex h-[400px] w-full flex-col rounded-2xl">
      <header className="relative h-full grow">
        <Image
          alt="Mountains"
          src={canoe}
          placeholder="blur"
          quality={100}
          fill
          style={{
            objectFit: "cover",
          }}
        />
        {/* <Overlay /> */}
        <FeatureTag price={data.price} />

        <div className="absolute bottom-6 left-6 z-30 grid">
          <Line width="57.75px" />
          <p className="mt-2 text-white">
            {formatISODateString(data.createdAt)}
          </p>
          <p className="font-bold capitalize text-white">{data.title}</p>
        </div>
      </header>

      <div className="bg-white px-6 py-6 text-sm text-[#727272]">
        {/* <main>
           <p className="mb-3 tracking-wider">
            {formatISODateString(data.createdAt)}
          </p> 
          <button className="mb-4 w-full rounded bg-[#ffb200] py-3 text-xs font-semibold text-black">
            SEE PLAN
          </button>
        </main> */}

        <footer className="flex items-center gap-x-4">
          <div>
            <span className="font-bold text-black">Project Planning</span>
            <ul className="text mb-4 flex flex-col gap-y-1 text-black">
              <li>
                <span className="">House:</span> 1200 sq ft. house
              </li>
              <li>
                <span className="">Kitchens:</span> 2
              </li>
              <li>
                <span className="">Bedrooms:</span> 3
              </li>
              <li>
                <span className="">Balconies:</span> 1
              </li>
            </ul>
          </div>
          {/* <div className="flex items-center gap-x-2">
            <IoEyeSharp className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.view}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <IoMdShare className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.share}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <CiHeart className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.favourite}</p>
          </div> */}
        </footer>
      </div>
    </article>
    
  );
};

const FeaturesCardBack = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <article className="flip-card-back relative h-[400px] w-full bg-gray-900 px-6 py-10">
      <Image
        alt="Mountains"
        src={ceiling}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        className="-z-20"
      />
      <FeatureTag price={data.price} />
      <Overlay />
      <main className="relative z-50 mb-4 pt-4 text-sm font-semibold text-[#727272]">
        <Line width="57.75px" />
        <h3 className="mb-4 mt-2 text-2xl font-bold capitalize text-white">
          {data.title}
        </h3>
        <ul className="mb-4 flex flex-col gap-y-1 text-white">
          <li>
            <span className="">House:</span> 1200 sq ft. house
          </li>
          <li>
            <span className="">Kitchens:</span> 2
          </li>
          <li>
            <span className="">Bedrooms:</span> 3
          </li>
          <li>
            <span className="">Balconies:</span> 1
          </li>
        </ul>
        <p className="mb-3 text-xs tracking-wider text-white">
          {formatISODateString(data.createdAt)}
        </p>
        <button className="w-full rounded bg-[#ffb200] py-3 text-black">
          SEE MORE
        </button>
      </main>

      <footer className="relative z-50 flex items-center gap-x-4 text-base">
        {/* <div className="flex items-center gap-x-2">
          <IoEyeSharp className="text-2xl font-bold text-[#ffb200]" />
          <p className="font-medium text-white">{data.view}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <IoMdShare className="text-2xl font-bold text-[#ffb200]" />
          <p className="font-medium text-white">{data.share}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <CiHeart className="text-2xl font-bold text-[#ffb200]" />
          <p className="font-medium text-white">{data.favourite}</p>
        </div>  */}
      </footer>
    </article>
  );
};

// const Tag = ({ price }: { price: number }) => {
//   return (
//     <div className="absolute right-0 top-0 flex items-center gap-x-1 rounded-es-full bg-[#172554] px-6 py-1.5 font-medium text-white">
//       <p>${price}</p>
//     </div>
//   );
// };

const FeatureTag = ({ price }: { price: number }) => {
  return (
    <div className="absolute right-[-14px] top-2 z-20 flex items-center gap-x-1 bg-[#FFB200] px-3 py-1 font-medium text-black">
      <p>${price}</p>
    </div>
  );
};
