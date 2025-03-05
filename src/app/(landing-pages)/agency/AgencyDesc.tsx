import Line from "@/src/app/components/Line"
import { useState } from 'react'
import SuccessAgency from './SuccessAgency'
import { apiInstance } from "../../dashboard/orders/action";


interface AgencyDescProps {
  agencyData: any; // Replace 'any' with a proper type if needed
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AgencyDesc: React.FC<AgencyDescProps> = ({ agencyData, handleChange }) => {

  const [isOpen, setIsOpen] = useState(false)


  function OpenAgencyForm(e: any) {
    const data = {
      fullName: "John Doe",
      nationality: "Nigerian",
      nationalIdOrPassport: "A12345678",
      phoneNumber: "+2348012345678",
      personalEmail: "johndoe@example.com",
      permanentAddress: "456 Greyhood Road, lagos, Nigeria",
      personalDocuments: [
        "https://example.com/doc1.pdf",
        "https://example.com/doc2.pdf"
      ],
      agencyLogo: "https://example.com/logo.png",
      agencyName: agencyData?.name,
      serviceDivision: agencyData?.serviceDivision || "Visa",
      serviceArea: agencyData?.serviceArea,
      grade: agencyData?.grade,
      employees: [
        "6792aa3e7e4edbdeaff37487"
      ],
      officeAddress: agencyData?.physicalAddress,
      phoneNumberOffice: agencyData?.mobileNumber,
      officeEmail: agencyData?.mobileNumber,
      agencyDocuments: [
        "https://example.com/license.pdf",
        "https://example.com/certificate.pdf"
      ],
      description: agencyData?.description,
      currency: "NGN",
      feeAmount: 50000,
      depositAmount: 20000
    }
    e.preventDefault()
    apiInstance.post("/api/v1/factory-app/agencies/register", data).then(res => {
      console.log(res)
      setIsOpen(true)
    }).catch((err) => {
      console.log(err)
    })


  }

  return (

    <div className="fixed inset-0 mx-auto bg-opacity-50 w-full h-screen z-100 bg-black flex flex-col justify-center items-center">
      <div className="overflow-y-scroll md:overflow-y-hidden bg-white w-[90%] mb-4 md:w-[70%] h-screen md:h-[95%] flex flex-col z-1000">
        <div className="flex flex-col items-center justify-center md:px-8 px-3 py-6 text-black w-full">
          <Line />
          <h1 className="text-bold mb-1 mt-3 md:text-xl text-lg">Agency Registration Form</h1>
          <p>Agency Information</p>

          <form>
            <fieldset className="border-2 border-[#151854] py-2 px-5 mt-3 w-[600px]">
              <legend className="text-[#151854] font-bold sm:text-sm text-[13px] sm:px-2 px-1">Description of Services</legend>
              <textarea rows={6} className="w-[100%] min-h-[150px] sm:text-base text-sm" name="description" onChange={handleChange}>
              </textarea>
            </fieldset>
            <div className="mt-4 flex-col md:flex-row md:flex space-y-4 md:space-y-0 justify-between items-center">
              <div className="space-x-2 flex">
                <input type="checkbox" name="terms" className="w-[30px]" onChange={handleChange} required />
                <label className="md:text-base text-sm">I agree to all terms and conditions, privacy policy</label>
              </div>
              <button onClick={OpenAgencyForm} className="bg-[#151854] py-2 px-8 text-white font-bold text-center md:w-[130px] text-sm w-full">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {isOpen && <SuccessAgency />}
    </div>

  )

}



export default AgencyDesc; 