"use client"
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "/public/skyfaced.jpg";
import { NoticeTable } from "../../components/NoticeTable"; // Import the Client-side Table Component
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
//Just for testing
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";
import SkeletonCard from "../../components/Loader";




type Notice = {
  id: string;
  title: string;
  documents: string;
  createdAt: string;
  status: string;
};

const dummyData = [{
  serialNumber: 'Test',
  title: 'Notice-11',
  createdAt: '2025-01-30T16:30:00',
  status: 'coming soon',
  id: '6799f3878a7e3f2c86965640'
},{
  serialNumber: 'Test',
  title: 'Notice-11',
  createdAt: '2025-01-30T16:30:00',
  status: 'ongoing',
  id: '6799f3878a7e3f2c86965640'
},{
  serialNumber: 'Test',
  title: 'Notice-11',
  createdAt: '2025-01-30T16:30:00',
  status: 'expired',
  id: '6799f3878a7e3f2c86965640'
},{
  serialNumber: 'Test',
  title: 'Notice-11',
  createdAt: '2025-01-30T16:30:00',
  status: 'coming soon',
  id: '6799f3878a7e3f2c86965640'
}]


function Notice() {
  const dispatch = useDispatch()
  const noticeData: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
   const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);

  useEffect(() => {
    actions.getAll('notice/all', 'notices')
  }, [actions])

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="NOTICE BOARD" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>
      <main className="bg-gradient-to-br from-[#F5F5F5] to-[#F5F5F5] p-14 pb-20">
        <div className="mb-20 h-auto w-full overflow-hidden rounded-sm border border-transparent pb-6 shadow-lg">
          {/* Pass data to the client-side component */}
          <NoticeTable notices={dummyData}/>
         {noticeData ? <NoticeTable notices={noticeData}/> : <NoticeTable notices={dummyData}/>}
        </div>
        <Paginate />
      </main>
    </>
  );
}

export default Notice;
