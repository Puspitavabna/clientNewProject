"use client"
import EmployeeCard from "@/src/app/components/EmployeeCard";
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import skyfaced from "../../../../public/skyfaced.jpg";
//import { SERVER_URL } from "@/src/app/constants/api";
import Loader from "../../components/Loader";
import NoRecords from "../../components/NoRecordFound";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useMemo } from "react";
import { getAll } from "../../store/actions/allPagesActions/pagesActions";
import { RootState } from "../../store/store";


const dummyData = {
  _id: "6792612db370308e1d4002f2",
  name: "projecta",
  title: "string",
  photo: "http://projecta.jpg",
  links: []
}

function Employers() {
  const dispatch = useDispatch()
  const employeeData: any = useSelector((state: RootState ) => state.data.data)
  const loading: boolean = useSelector((state: RootState ) => state.data.loading)

  // const actions = bindActionCreators
   const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);
 
  useEffect(() => {
    actions.getAll('employee/all', 'employees')
  }, [actions])

  return (
    <>
      <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title="Employer" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>

      <main className="bg-gradient-to-br from-[#E6EDFC] to-[#E6EDFC] p-14 pb-20">
        <section className={employeeData?.length > 0 ? "mb-20 grid grid-cols-4 gap-10" : "mb-20 gap-10"}>
          {loading ?
            <Loader /> :
            employeeData?.length > 0 ? employeeData?.map((d: any, i: any) => (
              <EmployeeCard key={d.id} data={d} />
            )) :
            <EmployeeCard key={dummyData?._id} data={dummyData} />
          }
        </section>
        <Paginate />
      </main>
    </>
  );
}
export default Employers;
