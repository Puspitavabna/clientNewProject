import Image from "next/image";
import anthony from "../../../public/anthony.png";
import { EmployersDataProps } from "../(landing-pages)/employers/definition";
import { CiUser } from "react-icons/ci";




function EmployeeCard({ data }: { data: EmployersDataProps }) {
  return (
    <div className="w-[320px] h-[400px] group relative flex flex-col items-center rounded-lg bg-[#ffffff] p-4 shadow-md transition-all duration-300 hover:border-[#FFB200] hover:bg-[#151B54] hover:text-white hover:shadow-lg">
      {/* Profile Picture Container */}
      <div className="rounded-full p-2 transition-all duration-300 group-hover:scale-105">
        {/* Profile Picture with Dashed Border */}
        <div className="h-[220px] w-[220px] overflow-hidden rounded-full border-4 border-dashed border-primary group-hover:border-secondary transition-all duration-200">
          {data?.photo ? (
            <Image
              src={anthony}
              alt={`${data.name}'s Profile Picture`}
              width={220}
              height={220}
              className="object-cover w-full h-full"
            />
          ) : (
            <CiUser size={220} />
          )}
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-center my-4">
        <h2 className="text-[24px] text-[#232233] font-bold leading-[30px] font-JosefinSans group-hover:text-white">
          {data.name?.toUpperCase()}
        </h2>
        <p className="text-lg text-[#6C6C72] font-semibold font-JosefinSans leading-[25px] group-hover:text-[#ffffff99]">
          {data?.title?.toUpperCase()}
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mt-4 inline-flex w-full items-center justify-center space-x-4">
        {data?.links && data?.links.length > 0 ? (
          data.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="rounded-sm bg-white p-1 text-2xl hover:bg-primary hover:opacity-80"
              aria-label={link.platform}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon ? (
                <Image
                  src={link.icon}
                  width={30}
                  height={30}
                  alt={link.platform}
                  className="w-auto h-auto"
                />
              ) : (
                <p></p> // Fallback if no icon is provided   
              )}
            </a>
          ))
        ) : (
          <p className="text-gray-500">No social links available</p>
        )}
      </div>
    </div>


  );
}

export default EmployeeCard;
