
"use client"
import ArchitectureCard from "@/src/app/components/ArchitectureCard";
import Paginate from "@/src/app/components/Pagination";
import { ArchitectureDataProps } from "./definition";
import NewHero from "@/src/app/components/NewHero";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
import skyfaced from "/public/skyfaced.jpg";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
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

export default function Architecture() {
  const dispatch = useDispatch()
  const cachedArchitectureData: any = useSelector((state: RootState) => state.data.data)
  const loading: boolean = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
   const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);


  useEffect(() => {
    actions.getAll('realEstate/all', 'realEstateCount')
  }, [actions])

  const data = ["ALL", "MARKET CONSTRUCTION", "MOSAUE CONSTRUCTIION", "AIRPORT CONSTRUCTION", "SCHOOL CONSTRUCTION", "HOME CONSTRUCTION", "ROAD CONSTRUCTION"]

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        <NewHero image={skyfaced} title="REAL ESTATE PROJECT" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <div className="py-10 px-3 bg-tertiary">
        <Slider data={data} />
      </div>

      <main className={` ${ cachedArchitectureData?.length > 0 && 'flex flex-col' }items-center bg-gradient-to-br from-[#E9F0FF] to-[#E9F0FF] p-14 pb-20`}>
        <div className="mb-20 grid grid-cols-4 gap-6">
          {loading ? <SkeletonCard /> : cachedArchitectureData?.length > 0 ? cachedArchitectureData?.map((d: ArchitectureDataProps) => (
            <ArchitectureCard key={d._id} data={d} />
          )) : <ArchitectureCard key={dummyData._id} data={dummyData} />}
        </div>
        <Paginate /> 
      </main>
    </>
  );
}
