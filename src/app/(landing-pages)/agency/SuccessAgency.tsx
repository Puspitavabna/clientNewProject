import { FaCheck } from "react-icons/fa6";

const SuccessAgency = () =>{
    return (
    <div className="fixed inset-0 mx-auto bg-opacity-50 w-full h-screen z-100 bg-black flex flex-col justify-center items-center"> 
        <div className="bg-white md:w-[40%] md:h-[45%] w-[90%] flex flex-col z-1000">
            <div className="flex flex-col items-center justify-center px-14 py-10 text-black w-full">
            <FaCheck className="text-white text-sm bg-green-700 w-16 h-16 rounded-full text-center" />
            <h1 className="text-lg text-black font-bold mt-3">Order Successful</h1>
            <p className="text-gray-700 mt-1 md:text-base text-[14px]">Thank you so much for you order</p>
            <button className="block mt-5 bg-[#151854] py-3 px-6 text-white font-bold text-center text-sm">Check Status</button>
            </div>
        </div>
        
    </div>
    )
}

export default SuccessAgency