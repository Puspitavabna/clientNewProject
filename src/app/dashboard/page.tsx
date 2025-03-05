"use client";

import Link from "next/link";
import Details from "./components/Details";
import { useEffect, useState } from "react";
//import { SERVER_URL } from "@/src/app/constants/api";
import Cookies from "js-cookie";
import { env } from "../../../config/env";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";



function Profile() {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();
  const user: any = useSelector((state: RootState) => state.auth.user)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  console.log("Profile User:::", user)

  return (
    <section className="rounded-xl bg-[#F2E6C9] px-6 py-5">
      <header className="mb-4 flex items-end justify-between">
        <div className="flex items-end gap-x-4">
          <div className="h-16 w-16 rounded-full border border-black" />
          <div>
            <h3 className="font-semibold">Mr. Jack</h3>
            <p className="text-sm">Username: { ''}</p>
          </div>
        </div>

        <Link
          href="/dashboard/edit-profile"
          className="text-lg font-semibold text-blue-700"
        >
          Edit
        </Link>
      </header>
      <main className="flex items-start gap-x-4 gap-y-2 lg:flex-col xl:flex-row">
        <section className="w-full rounded-lg bg-white py-4 xl:w-1/2">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Personal Information
          </h2>

          <Details
            label="Full Name"
            data={user?.name === "" ? "-" : user?.name}
          />
          <Details
            label="Occupation"
            data={user?.occupation === "" ? "-" : user?.occupation}
          />
          <Details
            label="Speaking Language"
            data={user?.language?.length === 0 ? "-" : user?.language?.join(", ")}
          />
          <Details
            label="Date of Birth"
            data={user?.dob === "" ? "-" : user?.dob}
          />
          <Details
            label="National Identification Number/Passport Number"
            data={user?.identification === "" ? "-" : user?.identification}
          />
          <Details
            label="Present Address"
            data={[
              user?.present_address?.city,
              user?.present_address?.state,
              user?.present_address?.country,
            ].join(" ")}
          />
          <Details
            label="Permanent Address"
            data={[
              user?.permanent_address?.city,
              user?.permanent_address?.state,
              user?.permanent_address?.country,
            ].join(" ")}
          />
          <Details
            label="Phone No"
            data={user?.phone_no === undefined ? "-" : user?.phone_no}
          />
          <Details
            label="Email "
            data={user?.email === "" ? "-" : user?.email}
          />
        </section>

        <section className="grid w-full gap-y-2 xl:w-1/2">
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-xl font-semibold">
              Company Information
            </h2>

            <Details
              label="Company Name"
              data={
                user?.company_info?.company_name === ""
                  ? "-"
                  : user?.company_info?.company_name
              }
            />
            <Details
              label="Phone No."
              data={
                user?.company_info?.phone === ""
                  ? "-"
                  : user?.company_info?.phone
              }
            />
            <Details
              label="Email"
              data={
                user?.company_info?.email === ""
                  ? "-"
                  : user?.company_info?.email
              }
            />
            <Details
              label="Website Url"
              data={
                user?.company_info?.website_url === ""
                  ? "-"
                  : user?.company_info?.website_url
              }
            />
          </section>
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-xl font-semibold">
              Social Links
            </h2>

            <div className="flex justify-center gap-x-4">
              {user?.social_link?.length === 0 ? (
                <p>No link available</p>
              ) : (
                user?.social_link?.map((d: any, i: number) => (
                  <div
                    key={d._id}
                    className="h-10 w-10 rounded-full border border-black"
                  ></div>
                ))
              )}
            </div>
          </section>
        </section>
      </main>
    </section>
  );
}

export default Profile;
