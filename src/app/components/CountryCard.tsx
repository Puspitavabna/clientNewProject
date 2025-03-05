import Image from "next/image";
import { LocationsDataProps } from "../(landing-pages)/locations/definition";
import flag from "@/public/uk-flag.png"
import { FaFacebookF } from "react-icons/fa";


function CountryCard({ data }: { data: LocationsDataProps }) {
  return (

    <div className="group relative flex min-w-96 flex-col items-start justify-start rounded-lg bg-white p-4 shadow-lg transition-colors duration-300 ease-in-out hover:bg-[#151B54] hover:text-white cursor-pointer">
      {/* Header positioned at top-left */}
      <h2 className="absolute top-4 left-4 text-2xl font-bold font-poppins text-black group-hover:text-white">
        United Kingdom
      </h2>

      {/* Flag Image - Full width on the left */}
      <div className="relative mt-12 w-full h-36 overflow-hidden rounded-md shadow-md">
        <Image
          src={flag}
          alt={`Flag of ${data?.name}`}
          className="w-full h-full object-cover rounded-md"
          fill
        />
      </div>

      {/* Description Section */}
      <div className="mt-4 px-2 text-left text-[22px] font-light font-poppins text-black group-hover:text-white">
        <p>{data?.address || "Enzo Massart, Boulevard Ceulemans, 832, Hannut Mortsel 0748"}</p>
        <p>{data?.phone || "+19292339781"}</p>
        <p>{data?.email || "abc@apple.com"}</p>
      </div>

      {/* Social Media Icons */}
      <div className="mt-4 flex w-full justify-center">
        <div className="flex items-center justify-between space-x-2">
          {[1, 2, 3, 4].map((link, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-gray-400"
              aria-label="social"
            >
              <FaFacebookF className="text-white" />
            </a>
          ))}
        </div>
      </div>
    </div>



  );
}

export default CountryCard;
