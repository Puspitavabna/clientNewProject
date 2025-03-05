
"use client"
import NewHero from "@/src/app/components/NewHero";
import OrderCard from "@/src/app/components/OrderCard";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "/public/skyfaced.jpg";
import Slider from "../../components/Slider";
import { ArchitectureDataProps } from "../real-estate/definition";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
import SkeletonCard from "../../components/Loader";

const dummyData = [
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Technical Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Technical",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  },
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Construction Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Construction",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  },
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Export Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Export",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  },
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Visa Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Visa",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  },
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Travelling Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Travelling",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  },
  {
    "_id": "6792612db370308e1d4002f2",
    "title": "Hiring Card",
    "description": "des",
    "photo": "http://projecta.jpg",
    "category": "Hiring",
    "price": 2000,
    "view": 0,
    "share": 0,
    "favourite": 0,
    "createdAt": "2025-01-23T15:33:01.239Z",
  }
]

export default function Orders() {
  const dispatch = useDispatch()
  const orderData: any = useSelector((state: RootState) => state.data?.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)
  const [category, setCategory] = useState("")

  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);


  useEffect(() => {
    actions.getAll('order/all', 'orders')
  }, [actions])

  const categories = [
    "All",
    "Technical",
    "Construction",
    "Export",
    "Visa",
    "Travelling",
    "Hiring",
  ];

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        <NewHero image={skyfaced} title="PLACE OF ORDER" categories={categories} category={category} setCategory={setCategory}
          desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <div className="py-10 px-3 bg-tertiary">
        <Slider data={categories} />
      </div>

      <main className="bg-gradient-to-br from-[#E6EDFC] to-[#E6EDFC] p-14 pb-20">
        <section className="mb-20 grid grid-cols-4 gap-10">
          {orderData?.orders?.map((d: ArchitectureDataProps) => (
            <OrderCard key={d._id} data={d} />
          ))}
          {loading ? <SkeletonCard /> : orderData?.length > 0 ? orderData?.map((d: ArchitectureDataProps) => (
            <OrderCard key={d._id} data={d} />
          )) : 
          // <OrderCard key={dummyData?._id} data={dummyData} />
          <p>No Data</p>
          }
        </section>
        <Paginate />
      </main>
    </>
  );
}
