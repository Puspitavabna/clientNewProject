import React from 'react';
import Line from './Line';
import canoe from "/public/canoe.jpg";
import Image from 'next/image';


const FeatureTag = ({ price }: { price: number }) => {
    return (
      <div className="absolute right-[-14px] top-2 z-20 flex items-center gap-x-1 bg-[#FFB200] px-3 py-1 font-medium text-black">
        <p>${price}</p>
      </div>
    );
  };


const SeeMoreSoftware = () => {
    return (
        <div>
            <article className="relative flex h-[400px] w-full flex-col rounded-md custom-shadow">
<header className="relative h-full grow">
 <Image
          alt="Mountains"
          src={canoe}
          placeholder="blur"
         quality={100}
         fill
         sizes="100vw"
         style={{
           objectFit: "cover",
          }}
        />
       
       {/* <FeatureTag  price="232423"
       /> */}

       <div className="absolute bottom-6 left-6 z-30 grid">
         <Line width="57.75px" />
          <p className="text-white mt-2">
            {/* {formatISODateString(data.createdAt)} */} asd
           </p>
         <p className="font-bold capitalize text-white">
           {/* {data.title} */}asdas
         </p>
       </div>
      </header>

      <div className="bg-white px-6 py-6 text-sm text-[#727272]">
        

     <footer className="flex items-center gap-x-4">
       <div>
           <span className="font-bold">Project Planning</span>
             <ul className="mb-4 flex flex-col gap-y-1 text to-black">
             <li>
               <span className="">House:</span> 1200 sq ft. house
              </li>
               <li>
               <span className="">Kitchens:</span> 2
             </li>
             <li>
               <span className="">Bedrooms:</span> 3
              </li>
              <li>
                <span className="">Balconies:</span> 1
              </li>
             </ul>
          </div>
          {/* <div className="flex items-center gap-x-2">
//             <IoEyeSharp className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.view}</p>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <IoMdShare className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.share}</p>
//           </div>
//           <div className="flex items-center gap-x-2">
//             <CiHeart className="text-xl font-bold text-[#172554]" />
//             <p className="font-semibold text-[#79797999]">{data.favourite}</p>
//           </div> */}
        </footer>
      </div>
    </article>

        </div>
    );
};

export default SeeMoreSoftware;