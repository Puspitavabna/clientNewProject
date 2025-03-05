import Image from "next/image";
import { IoMdPricetag } from "react-icons/io";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import { formatISODateString } from "../lib/formatISODateString";

export default function ProjectCard({
  image,
  data,
}: {
  image: any;
  data: ArchitectureDataProps;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl bg-white px-6 py-5 font-medium text-[#00000099] shadow-xl">
      <header className="relative mb-4 h-52 overflow-hidden rounded-lg">
        <Image
          alt="Mountains"
          src={image}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </header>

      <main className="mb-2">
        <p className="text-xs tracking-wide">
          {formatISODateString(data.createdAt)}
        </p>
        <h3 className="text-lg font-bold capitalize text-black">
          {data.title}
        </h3>
        <p className="text-sm">{data.description}</p>
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

      <Tag />
    </article>
  );
}

const Tag = () => {
  return (
    <div className="absolute right-0 top-0 flex items-center gap-x-1 rounded-es-full bg-[#2A56EB] px-6 py-1.5 font-medium text-white">
      <IoMdPricetag />
      <p>$1234</p>
    </div>
  );
};
