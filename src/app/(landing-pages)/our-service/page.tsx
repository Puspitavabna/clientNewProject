
"use client"
import ServiceCard from "@/src/app/components/NewServiceCard";
import Paginate from "@/src/app/components/Pagination";
import NewHero from "@/src/app/components/NewHero";
import skyfaced from "/public/skyfaced.jpg";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
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

function Services() { 

  const dispatch = useDispatch()
  const serviceData: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
   const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll('service/all', 'services')
  }, [actions])


  const data = ["ALL", "MARKET CONSTRUCTION", "MOSAUE CONSTRUCTIION", "AIRPORT CONSTRUCTION", "SCHOOL CONSTRUCTION", "HOME CONSTRUCTION", "ROAD CONSTRUCTION"]
  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="CONSTRUCTION SERVICES" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <div className="py-10 px-3 bg-tertiary">
        <Slider data={data} />
      </div>

      <main className="bg-gradient-to-br bg-tertiary p-14 pb-20 pt-18">
        <section className="mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">

          {loading ? <SkeletonCard /> : serviceData?.length > 0 ? serviceData?.map((d: any, i: number) => (
            <ServiceCard data={d} key={d._id} />
          )) : <ServiceCard data={dummyData} key={dummyData._id} />}

        </section>
        {serviceData?.length > 0 ? <Paginate /> : null}
      </main>
    </>
  );
}

export default Services;
