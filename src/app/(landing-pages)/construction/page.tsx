
"use client"
import Paginate from "@/src/app/components/Pagination";
import NewHero from "@/src/app/components/NewHero";
import SliderIcon from "../../components/SliderIcon";
import { FaReact } from "react-icons/fa";
import { SiNestjs, SiTailwindcss } from "react-icons/si";
import skyfaced from "/public/skyfaced.jpg";
import TechnicalCard from "../../components/CommonCard";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
import SkeletonCard from "../../components/Loader";
import NoRecords from "../../components/NoRecordFound";


const dummyData = {
  "_id": "6792612db370308e1d4002f2",
  "title": "projecta",
  "description": "des",
  "photo": "http://projecta.jpg",
  "price": 2000,
  "view": 0,
  "share": 0,
  "favourite": 0,
  "createdAt": "2025-01-23T15:33:01.239Z",
}

function Construction() {

  const dispatch = useDispatch()
  const projectData: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll('construction/all', 'data')
  }, [actions])

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="CONSTRUCTION SERVICES" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <SliderIcon
        data={[
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-1"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-1"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-1"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-2"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-2"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-2"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-3"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-3"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-3"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-4"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-4"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-4"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-5"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-5"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-5"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-6"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-6"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-6"
          />,
          <FaReact
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="react-7"
          />,
          <SiNestjs
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl"
            key="nestjs-7"
          />,
          <SiTailwindcss
            className="rounded-full bg-[#E9F0FF] p-2 text-5xl text-blue-500"
            key="tailwind-7"
          />,
        ]}
      />

      <main className="bg-gradient-to-br from-[#E9F0FF] to-[#E9F0FF] p-14 pb-20">
        <div className="mb-20 grid grid-cols-4 gap-4">
        <TechnicalCard key={dummyData._id} data={dummyData} type="construction" />
          {/* {loading ? <SkeletonCard /> : projectData?.length > 0 ? projectData?.map((d: any, i: number) => (
            <TechnicalCard key={i} data={d} type="construction" />
          )) : <TechnicalCard key={dummyData._id} data={dummyData} type="construction" />} */}
        </div>
        <Paginate />
      </main>
    </>
  );
}

export default Construction;