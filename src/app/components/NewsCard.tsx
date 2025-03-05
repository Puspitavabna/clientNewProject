import Image from "next/image";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";
import canoe from "/public/canoe.jpg";

const NewsCard = ({ data }: { data: ArchitectureDataProps }) => {
  return (
    <section className="group rounded-md shadow-md">
      <article className="overflow-hidden p-2 font-medium text-[#00000099] transition-all duration-500 group-hover:rounded-md group-hover:bg-[#151B54] group-hover:shadow-md">
        <header className="relative mb-4 h-52">
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

        </header>

        <main className="mb-2 min-h-44 px-3 group-hover:text-white">
          <p className="mb-2 text-xs tracking-wide">
            {formatISODateString(data.createdAt)}
          </p>
          <div className="mb-1 flex flex-col gap-y-1">
            <div
              className="rounded bg-[#ffb200] transition-all group-hover:bg-[#2A56EB]"
              style={{
                width: "42px",
                height: "4px",
              }}
            ></div>
            <h3 className="text-lg font-bold capitalize text-black group-hover:text-white">
              {data.title}
            </h3>
          </div>
          <p className="text-sm">{data.description}</p>
        </main>
        <footer className="flex items-center gap-x-4 px-3"></footer>
      </article>
    </section>
  );
};

export default NewsCard;

// another card view
// export default function NewsCard({
//   image,
//   data,
// }: {
//   image: any;
//   data: ArchitectureDataProps;
// }) {
//   return (
//     <div className="flip-card relative shadow-xl">
//       <div className="flip-card-inner absolute h-fit transform transition duration-500 ease-in-out">
//         <NewsCardFront image={image} data={data} />
//         <NewsCardBack image={image} data={data} />
//       </div>
//     </div>
//   );
// }

// const NewsCardFront = ({
//   image,
//   data,
// }: {
//   image: any;
//   data: ArchitectureDataProps;
// }) => {
//   return (
//     <article className="flip-card-front custom-shadow absolute flex h-[500px] w-full flex-col overflow-hidden rounded-xl bg-white px-6 py-5">
//       <header className="relative mb-4 h-52 overflow-hidden rounded-lg">
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
//       </header>

//       <main className="mb-2">
//         <p className="mb-3 text-[#0E63FF]">
//           {formatISODateString(data.createdAt)}
//         </p>
//         <h3 className="mb-3 text-lg font-bold capitalize text-[#000000]">
//           {data.title}
//         </h3>
//         <p className="text-[#00000099">{data.description}</p>
//       </main>
//       <footer className="flex items-center gap-x-4"></footer>
//     </article>
//   );
// };

// const NewsCardBack = ({
//   image,
//   data,
// }: {
//   image: any;
//   data: ArchitectureDataProps;
// }) => {
//   return (
//     <article className="flip-card-back relative h-[500px] w-full overflow-hidden rounded-xl bg-gray-900 px-6 py-10">
//       <Image
//         alt="Mountains"
//         src={canoe}
//         placeholder="blur"
//         quality={100}
//         fill
//         sizes="100vw"
//         style={{
//           objectFit: "cover",
//         }}
//       />
//       <main className="relative z-50 mb-4 pt-4 text-sm font-semibold text-[#727272]">
//         <Line width="57.75px" color="#2A56EB" />
//         <h3 className="mb-4 mt-2 text-2xl font-bold capitalize text-white">
//           {data.title}
//         </h3>
//         <p className="text-white">{data.description}</p>
//         <p className="mb-3 mt-6 text-xs tracking-wider text-white">
//           {formatISODateString(data.createdAt)}
//         </p>
//         {/* <button className="w-full rounded bg-[#2A56EB] py-3 text-white">
//           SEE MORE
//         </button> */}
//       </main>
//       <footer className="relative z-50 flex items-center gap-x-4 text-base"></footer>
//     </article>
//   );
// };
