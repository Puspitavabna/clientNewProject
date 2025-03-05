"use client"
// import ProjectCard from "@/app/components/ProjectCard";
import Paginate from "@/src/app/components/Pagination";
import TemplateCard from "@/src/app/components/TemplateCard";
//import { SERVER_URL } from "@/src/app/constants/api";
import NewHero from "@/src/app/components/NewHero";
//Just for testing
import { RootState } from "../../store/store";
import skyfaced from "/public/skyfaced.jpg";
import Slider from "../../components/Slider";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import SkeletonCard from "../../components/Loader";
import NoRecords from "../../components/NoRecordFound";
import PlaceholderModal from "../../components/PlaceholderModal";


function Template() {
  const dispatch = useDispatch()
  const projecs: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  // const actions = bindActionCreators
     const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll('software/all', 'softwares')
    // setNewsData(news)
  }, [actions])


  const data = ["ALL", "MARKET CONSTRUCTION", "MOSAUE CONSTRUCTIION", "AIRPORT CONSTRUCTION", "SCHOOL CONSTRUCTION", "HOME CONSTRUCTION", "ROAD CONSTRUCTION"]
 
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

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="SOFTWARE  PROJECTS" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <div className="py-10 px-3 bg-tertiary">
        <Slider data={data} />
      </div>

      <main className="bg-gradient-to-br from-[#E9F0FF] to-[#E9F0FF] p-14 pb-20">
        <div className="mb-20 grid grid-cols-4 gap-4">
          {loading ? <SkeletonCard /> : projecs?.length > 0 ? projecs?.map((d: any, i: number) => (
            // <ProjectCard key={i} data={d} image={images[0]} />
            <TemplateCard key={i} data={d} />
          )) : <TemplateCard key={dummyData._id}  data={dummyData} setModalState={setIsModalOpen}/>}
        </div>
        {projecs?.length > 0 ? <Paginate /> : null}
      </main>
      {isModalOpen && (
                <PlaceholderModal
                    title={projecs?.title || dummyData?.title}
                    desc={projecs?.description || dummyData?.description}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
    </>
  );
}

export default Template;