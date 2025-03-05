"use client"
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "/public/skyfaced.jpg";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
import visaImage from "/public/images/visaImage.png"
import CommonCard from "../../components/CommonCard";
import Slider from "../../components/Slider";
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

function Traveling() {
  const dispatch = useDispatch()
  const projectData: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll('travelling/all', 'data')
  }, [actions])

  const data = ["ALL", "MARKET CONSTRUCTION", "MOSAUE CONSTRUCTIION", "AIRPORT CONSTRUCTION", "SCHOOL CONSTRUCTION", "HOME CONSTRUCTION", "ROAD CONSTRUCTION"]

  return (
    <>

      <header className="flex flex-col gap-y-4 bg-tertiary">
        <NewHero image={skyfaced} title="TRAVELING SERVICES" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <div className="py-10 px-3 bg-tertiary">
        <Slider data={data} />
      </div>

      <main className="bg-gradient-to-br from-[#E6EDFC] to-[#E6EDFC] p-14 pb-20">
        <section className="mb-20 grid grid-cols-4 gap-10">
          {loading ? <SkeletonCard /> : projectData?.length > 0 ? projectData?.map((d: any, i: number) => (
            <CommonCard key={i} data={d} type="traveling" />
          )) : <CommonCard key={dummyData?._id} data={dummyData} type="traveling" />}
        </section>
        <Paginate />
      </main>
    </>
  );
}
export default Traveling;
