"use client";
import Line from "@/src/app/components/Line";
import React, { useRef } from "react";
import Image from "next/image";
import { formatDate2, formatTime } from "../../lib/formatDate";
import nasaLogo from "/public/nasa-logo.png"
import signatureLogo from "/public/signature.png"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ProjectDetailsPage = ({ userOrder }: { userOrder: any }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // PDF width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('project-details.pdf');
    }
  };

  return (
    <div className="bg-white flex justify-center items-center w-[500px] h-[650px]">
      <div className="rounded-lg bg-white p-8">
        <div className="mb-2 flex flex-col items-center">
          <Line />
          <h1 className="mt-2 text-3xl font-bold">
            {" "}
            {userOrder?.orderid.title}
          </h1>
          {/* <p className="text-lg">Essential Details Of The Project</p> */}
          <p className="mt-2 text-lg">order ID : {userOrder?.orderNumber}</p>
          <p className="text-lg">
            order Date : {formatDate2(userOrder?.createdAt)}{" "}
            {formatTime(userOrder?.createdAt)}
          </p>
        </div>

        <div className="grid grid-cols-2">
          {/* Project Info Section */}
          <div className="mb-4 text-left text-sm">
            <p>
              <span className="font-semibold">Applicant&apos;s Full Name:</span>{" "}
              {userOrder?.full_name}
            </p>
            <p>
              <span className="font-semibold">Project Requirements:</span>{" "}
              {userOrder?.project_requirement}
            </p>
            <p>
              <span className="font-semibold">Type of Project:</span>{" "}
              {userOrder?.project_type}
            </p>
            <p>
              <span className="font-semibold">Pay Currency:</span>{" "}
              {userOrder?.pay_currency}
            </p>
            <p>
              <span className="font-semibold">Budget:</span> {userOrder?.budget}
            </p>
            {userOrder?.minimum_pay > 0 && (
              <p>
                <span className="font-semibold">Minimum Pay:</span>{" "}
                {userOrder.minimum_pay}
              </p>
            )}
            <p>
              <span className="font-semibold">Project Deadline:</span>{" "}
              {formatDate2(userOrder?.project_deadline)}
            </p>
            <p>
              <span className="font-semibold">Reference Name:</span>{" "}
              {userOrder?.reference_name}
            </p>
            <p>
              <span className="mr-1 font-semibold">
                Provide the project related files:
              </span>
              {userOrder?.project_files && userOrder?.project_files.length > 0
                ? "Yes"
                : "No"}
            </p>
          </div>
          {/* <div>
            <p className="text-lg">Essential Details Of The Project</p>
            <p className="text-lg">order ID : 4644
            </p>
            <p className="text-lg">order Date : 02-02-2024(02:23 pm)</p>

          </div> */}
          <div className="flex justify-end h-[100px]">
            <Image
              src={nasaLogo}
              alt="NASA logo"
              width={100}
              height={100}
              className="rounded-full mt-4"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="text-left border-2 border-[#D9D9D9] rounded-lg overflow-y-auto h-[100px]">
          <h2 className="mb-2 text-lg font-semibold">
            Give some details about the project:
          </h2>
          <p className="w-full px-2 text-justify text-xs">
            {userOrder?.project_details}
          </p>
        </div>

        <div className="flex justify-between gap-20">
          {/* Agreement Section */}
          <div className="mt-3 flex flex-col space-y-1 text-left">
            <div>
              <input
                type="checkbox"
                id="accepted_terms"
                className="mr-2"
                checked={!!userOrder?.accepted_terms}
              />
              <label htmlFor="accepted_terms">
                I agree all Transcend & condition , privacy policy
              </label>
            </div>

            {/* <div>
              <input type="checkbox" id="confirm" className="mr-2" defaultChecked />
              <label htmlFor="confirm">I confirm that the information is correct.</label>
            </div>
            <div>
              <input type="checkbox" id="apply" className="mr-2" defaultChecked />
              <label htmlFor="apply">I am applying by agreeing to these terms.</label>
            </div>*/}
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-6 flex items-center space-x-4">
          <p className="text-right font-semibold">Applicant signature:</p>
          <Image
          // src={userOrder?.user_signatory?.signature || signatureLogo }
           src={signatureLogo}
            alt="sign"
            width={80}
            height={30}
            className=""
          />
          <div onClick={handleDownloadPDF}>Download</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
