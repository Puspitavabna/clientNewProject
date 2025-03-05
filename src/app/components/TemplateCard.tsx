import Image from "next/image";
import { IoMdPricetag } from "react-icons/io";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";
import Line from "./Line";
import Overlay from "./Overlay";
import skyfaced from "/public/skyfaced.jpg";
import { Link } from "react-router-dom";


export default function TemplateCard({
  data,
  setModalState
}: {
  data: ArchitectureDataProps;
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flip-card relative rounded-2xl shadow-xl">
      <div className="flip-card-inner h-fit transform rounded-2xl transition duration-500 ease-in-out">
        <TemplateCardFront data={data} />
        <TemplateCardBack data={data} setModalState={setModalState} />
      </div>
    </div>
  );
}

const TemplateCardFront = ({
  data,
}: {
  data: ArchitectureDataProps;
}) => {
  return (
    <article className="flip-card-front custom-shadow absolute flex h-[500px] w-full flex-col overflow-hidden rounded-2xl bg-white px-6 py-5">
      <header className="relative mb-4 h-52 overflow-hidden rounded-2xl">
        <Image
          alt="Mountains"
          src={skyfaced}
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"  // Use different image sizes for different screen widths
          style={{
            objectFit: "cover",
          }}
        />

        {/* <Overlay /> */}
      </header>

      <main className="mb-2">
        <p className="mb-3 text-[#0E63FF]">
          {formatISODateString(data.createdAt)}
        </p>
        <h3 className="mb-3 text-lg font-bold capitalize text-[#000000]">
          {data.title}
        </h3>
        <p className="text-[#00000099">{data.description}</p>
      </main>

      <footer className="flex items-center gap-x-4">
        {/* <button className="flex items-center gap-x-2">
            <IoEyeSharp className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.view}</p>
          </button>
          <button className="flex items-center gap-x-2">
            <IoMdShare className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.share}</p>
          </button>
          <button className="flex items-center gap-x-2">
            <CiHeart className="text-xl font-bold text-[#172554]" />
            <p className="font-semibold text-[#79797999]">{data.favourite}</p>
          </button> */}
      </footer>
      <Tag price={data.price} />
    </article>
  );
};

const TemplateCardBack = ({
  data,
  setModalState
}: {
  data: ArchitectureDataProps;
  setModalState?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <article className="flip-card-back relative h-[500px] w-full overflow-hidden rounded-2xl bg-gray-900 px-6 py-10">
      <Image
        alt="Mountains"
        src={skyfaced}
        quality={100}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"  // Use different image sizes for different screen widths
        style={{
          objectFit: "cover",
        }}
      />


      <Tag price={data.price} />
      <Overlay />
      <main className="relative z-50 mb-4 pt-4 text-sm font-semibold text-[#727272]">
        <Line width="57.75px" color="#2A56EB" />
        <h3 className="mb-4 mt-2 text-2xl font-bold capitalize text-white">
          {data.title}
        </h3>
        <p className="text-white">{data.description}</p>
        <p className="mb-3 mt-6 text-xs tracking-wider text-white">
          {formatISODateString(data.createdAt)}
        </p>
        {/* <Link to="/seeMoreSoftware"> */}
        <button className="w-full rounded bg-[#2A56EB] py-3 text-white" onClick={() => setModalState && setModalState(true)}>
          SEE MORE
        </button>
        {/* </Link> */}
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

const Tag = ({ price }: { price: number }) => {
  return (
    <div className="absolute right-0 top-0 z-20 flex items-center gap-x-1 rounded-es-full bg-[#2A56EB] px-6 py-1.5 font-medium text-white">
      <IoMdPricetag />
      {/* <p>${price}</p> */}
      <p>$1234</p>
    </div>
  );
};
