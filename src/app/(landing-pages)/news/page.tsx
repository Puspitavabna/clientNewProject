'use client'
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "/public/skyfaced.jpg";
import BlogCard from "@/src/app/components/BlogCard";
import { RootState, store } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import SkeletonCard from "../../components/Loader";
import NoRecords from "../../components/NoRecordFound";


export interface NewsItem {
  _id: string;
  title: string;
  description: string;
  photo: string;
  price: number;
  view: number;
  share: number;
  favourite: number;
  createdAt: string;
}

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


function News() {
  const [newsData, setNewsData] = useState<{ [key: string]: any }[]>([]);
  const dispatch = useDispatch()
  const news: any = useSelector((state: RootState) => state.data.data)
  const loading: boolean = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
   const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll("blog/all", "blogs")
    // setNewsData(news)
  }, [actions])

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero cardData={newsData} setCardData={setNewsData} image={skyfaced} title="LATEST NEWS" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <main className="bg-gradient-to-br from-[#E6EDFC] to-[#E6EDFC] pb-20 pl-8 pr-8 pt-14">
        <div className="mb-20 grid grid-cols-4 gap-6">
          {loading ? <SkeletonCard /> : news?.length > 0 ? news && news?.map((d: any, i: number) => (
            <BlogCard data={d} key={d._id} />
          )) : <BlogCard data={dummyData} key={dummyData._id} />}
        </div>
        <Paginate />
      </main>
    </>
  );
}

export default News;
 