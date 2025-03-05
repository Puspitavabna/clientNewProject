import Image from "next/image";
import FeaturesCard from "../components/FeaturesCard";
import Line from "../components/Line";
import { functionalData, placeholderData } from "../data";
import ags from "/public/ags.png";
import art from "/public/art.jpg";
import maskIcon from "../../../public/Mask group (1).png";
import cp from "/public/cp.png";
import duplex from "/public/duplex.jpg";
import house from "/public/house.jpg";
import huff from "/public/huff.png";
import lola from "/public/lola.png";
import map from "/public/map.png";
import oil from "/public/oil.jpg";
import parallel from "/public/parallel.jpg";
import park from "/public/park.png";
import skyscrapper from "../../../public/skyscrapper.jpg";
import vienna from "/public/vienna.png";
import bottomImage from '../../../public/images/landing-page-bottom-image.svg'
//import { SERVER_URL } from "@/src/app/constants/api";
import { env } from "../../../config/env";
import ImageSlider from "../components/ImageSlider";
import NewsCard from "../components/NewsCard";
import ServiceCard from "../components/ServiceCard";
import Slider from "../components/Slider";
import TemplateCard from "../components/TemplateCard";
import { ArchitectureDataProps } from "./real-estate/definition";
import { it } from "node:test";
import { store } from "../store/store";
import { cacheArchitecture, cacheBlog } from "../store/slices/temporalStorageSlice";
import Banner from "../components/Banner";
import Clip from "../components/Clip";
import GlobeOrbit from "../components/GlobalOrbit";
import employeeImage from '../../../public/images/home-employee-image.svg'
import wordGlobeImage from '../../../public/images/home-design.svg'
import { bindActionCreators } from "redux";

import { getHomeBanner } from "../store/actions/banner/homeBannerAction";
import BlogCard from "../components/BlogCard";
import { BsBarChart } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaCodeBranch } from "react-icons/fa";


async function getProjects() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/project/all`,
    {
      cache: 'no-store',
      method: "GET", // Ensure the method matches what works in Postman
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  );
  if (res.status !== 200) {
    console.log(res.status)
    return []
    //throw new Error("Failed to fetch data");
  }
  const body = await res.json()

  return body;

}

async function getData(endPoint: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/${endPoint}`,
    {
      cache: 'no-store',
      method: "GET", // Ensure the method matches what works in Postman
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  );
  if (res.status !== 200) {
    console.log(res.status)
    return []
    //throw new Error("Failed to fetch data");
  }
  const body = await res.json()

  return body;

}

async function getCounters() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/counter-section`,
    {
      cache: 'no-store',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  );
  if (res.status !== 200) {
    console.log(res.status)
    return []
    //throw new Error("Failed to fetch data");
  }
  const body = await res.json()

  return body;

}

async function getArchitectures() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/architecture/all`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) {  // Improved status check
      const errorText = await res.text(); // Get error message from the server
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${res.status}`); // More descriptive error
    }

    const body = await res.json();

    return body;

  } catch (error) {
    console.error("Error in getArchitectures:", error);
    return []
  }
}

async function getSecurity() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/security-page/get`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) {  // Improved status check
      const errorText = await res.text(); // Get error message from the server
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${res.status}`); // More descriptive error
    }

    const body = await res.json();

    return body;

  } catch (error) {
    console.error("Error in getArchitectures:", error);
    return []
  }
}

async function getEmployeeHiring() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/employee-hiring/get`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) {  // Improved status check
      const errorText = await res.text(); // Get error message from the server
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${res.status}`); // More descriptive error
    }

    const body = await res.json();

    return body;

  } catch (error) {
    console.error("Error in getArchitectures:", error);
    return []
  }
}


async function getBlogs() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/blog/all`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) { // Use res.ok
      const errorText = await res.text(); // Get error text
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${res.status}`); // More descriptive error
    }

    const body = await res.json();
    return body?.blogs;

  } catch (error) {
    console.error("Error in getBlogs:", error);
    return []
  }
}
async function getServiceData() {
  //Commented By Me
  //const res = await fetch(`${SERVER_URL}/user/homepage`);
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/service/all`,
    {
      cache: 'no-store',
      method: "GET", // Ensure the method matches what works in Postman
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  );
  if (!res.ok) {
    return []
    //throw new Error("Failed to fetch data");
  }
  const body = await res.json()

  return body;
}

async function getEmployeeData() {
  try {
    const res = await fetch(
      // `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/employers/get/top-employees`,
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/employers/allEmployees`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text(); // Get error text from response
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${res.status}`); // More descriptive error
    }

    const body = await res.json();
    return body;

  } catch (error) {
    console.error("Error in getEmployeeData:", error);
    return [];
  }
}
async function getFunctunalCard() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/functionCard/all`,
      {
        cache: 'no-store',
        method: "GET", // Ensure the method matches what works in Postman
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
    if (res.status !== 200) {
      console.log(res.status)
      return []
      //throw new Error("Failed to fetch data");
    }
    const body = await res.json()

    return body;
  } catch (err) {
    return []
  }

}

async function getPlaceHolderData() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/placeholder/get`,
      {
        cache: 'no-store',
        method: "GET", // Ensure the method matches what works in Postman
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
    if (res.status !== 200) {
      console.log(res.status)
      return []
      //throw new Error("Failed to fetch data");
    }
    const body = await res.json()

    return body;
  } catch (err) {
    return []
  }

}

async function getServiceGallary() {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/service-gallery/get`,
      {
        cache: 'no-store',
        method: "GET", // Ensure the method matches what works in Postman
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      },
    );
    if (res.status !== 200) {
      console.log(res.status)
      return []
      //throw new Error("Failed to fetch data");
    }
    const body = await res.json()

    return body;
  } catch (err) {
    return []
  }

}

const Home = () => {
  //const { data } = await getData();


  const action = bindActionCreators({ getHomeBanner }, store.dispatch)

  // this will fetch banner details asynchronously and update data
  action.getHomeBanner()

  return (
    <>
      {/* <header className="flex flex-col gap-y-4 bg-white px-10 pb-10"> */}
      <header className=" font-poppins flex flex-col gap-y-4 bg-white ">



        {/* </div> */}

        <Banner text1={store.getState().homeBanner.banner.header ?? "INNOVATING ACROSS"} text2={store.getState().homeBanner.banner.subHeaderOne ?? "INFORMATION TECHNOLOGY"} text3={store.getState().homeBanner.banner.subHeaderTwo ?? " CIVIL ENGINEERING "}
          text4={store.getState().homeBanner.banner.subHeaderThree ?? "FOR A BETTER TOMORROW"} description={store.getState().homeBanner.banner.description ?? ""} image={store.getState().homeBanner.banner.image ?? ""} />
        <div className="mt-[-5%]">
          <Clip />
        </div>
        <div className=" -mt-4 md:-mt-44">
          <Placeholder />
        </div>
      </header>
      {/* Service Section  <div className="bg-gradient-to-br from-[#ffffff] to-[#ffffff] p-14">
        <Service />
      </div> */}




      {/* <div className="bg-[#ffffff] p-14 pb-10"> */}
      <div className=" w-full min-h-[1200px] mb-20 relative">

        <Gallery />
      </div>
      { /*<div className="bg-[#ffffff] p-14">
        <Project />
      </div>*/}
      {/* <div className="bg-color-primary-blue text-white pb-10">
        <Features />
      </div> */}
      <div className="bg-gradient-to-br from-[#ffffff] to-[#ffffff] px-14 pb-14">
        <Feedback />
      </div>
      {/* <div className="flex justify-center items-center space-x-4 p-8 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
          <div className="h-56 w-full overflow-hidden">
          <Image
              alt="Mountains"
              src={skyscrapper} // or your conditionally set src
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"  // Example: 100vw for small screens and 50vw for larger screens
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">Card Title</h5>
            <p className="text-gray-700 text-base mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">Learn more →</a>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
          <div className="h-56 w-full overflow-hidden">
          <Image
              alt="Mountains"
              src={skyscrapper} // or your conditionally set src
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"  // Example: 100vw for small screens and 50vw for larger screens
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">Card Title</h5>
            <p className="text-gray-700 text-base mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">Learn more →</a>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
          <div className="h-56 w-full overflow-hidden">
          <Image
              alt="Mountains"
              src={skyscrapper} // or your conditionally set src
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"  // Example: 100vw for small screens and 50vw for larger screens
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">Card Title</h5>
            <p className="text-gray-700 text-base mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">Learn more →</a>
          </div>
        </div>
      </div> */}
      {
        /**
         * <div className="bg-[#E9F0FF] p-14 pb-10">
     <News />
      </div>
         */
      }
      <div className="bg-color-primary-blue">
        <Evidence />
      </div>
      <div className="w-full sm:block md:flex bg-tertiary">
        <div className="p-5 md:p-10 xl:p-20 sm:w-full md:w-[40%]">
          <Sponsors />
        </div>
        <div className="sm:w-full md:w-[60%] p-4 md:p-10">
          <Image
            alt="Mountains"
            src={map}
            placeholder="blur"
            quality={100}
          // fill
          />
        </div>
      </div>
      {/* <div className="bg-gradient-to-br from-[#ffffff] to-[#ffffff] p-4"></div> */}
    </>
  );
}

const getIcon = (index: number) => {
  if (index == 0) return <BsBarChart size={30} className="text-black group-hover:text-white" />;
  if (index == 1) return <TbTargetArrow size={30} className="text-black group-hover:text-white" />;
  if (index == 2) return <FaCodeBranch size={30} className="text-black group-hover:text-white" />
}

interface PlaceholderData {
  title: string;
  text: string;
  // You can add other properties here if needed
}

const Placeholder = async () => {
  const functionalCardData = await getFunctunalCard();
  let placeholderApiData = await getPlaceHolderData();
  const security = await getSecurity();
  placeholderApiData = placeholderApiData?.placeHolders?.length ? placeholderApiData?.placeHolders : placeholderData

  return (
    <section className="mt-6 relative bg-[#E9F0FF]">
      {/* <div className="mb-10 flex flex-col items-center gap-y-4">
        <Line />
        <h2 className="text-2xl font-bold text-[#000000]">Processing Guide</h2>
      </div> */}
      <div className="w-full flex flex-wrap lg:flex-nowrap my-12 ">
        {/* Company Website Security Section */}
        {placeholderApiData?.map((data: PlaceholderData, i: number) => {
          return (
            <div key={i} className="group  md:mt-0 w-full flex sm:flex-col md:flex-row flex-wrap items-center justify-around py-4">
              <article
                className="w-96 text-center text-sm text-[#000000] relative z-10"
              >
                <div className="relative w-[80px] h-[80px] bg-white group-hover:bg-primary  mx-auto flex items-center justify-center clip-hexagon"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                  }}
                >
                  {/* <Image
                    src={data.icon}
                    alt="icon"
                    width={70} // Adjust size as needed
                    height={70} // Ensure correct aspect ratio
                    className="mx-auto"
                  /> */}
                  {/* <BsBarChart size={70} /> */}
                  {getIcon(i)}

                </div>
                <h3 className="mb-3 mt-8 text-2xl font-semibold font-poppins">{data?.title}</h3>
                <p className="mb-8 text-lg font-normal text-[#000000B3]">{data?.text}</p>
                <button className="py-2 px-4 rounded border border-[#B0B0B0] text-xs tracking-wide bg-tertiary font-medium uppercase text-[#000000] transition-all duration-150 hover:bg-[#151B54] hover:text-white">
                  Read more
                </button>
              </article>

              {
                (i !== placeholderData.length - 1) && <div className="w-full h-[6px] ">
                  <div className=" hidden md:block absolute  top-[8%] z-0 left-[18.6%] w-[62.5%] bg-primary h-[3px]" >
                    <div className="w-[15px] h-[15px] absolute top-[-6px]  left-[15%] rounded-full bg-primary"> </div>
                    <div className="w-[15px] h-[15px] absolute top-[-6px]   left-[30%] rounded-full bg-primary"> </div>
                    <div className="w-[15px] h-[15px] absolute top-[-6px]  right-[15%] rounded-full bg-primary"> </div>
                    <div className="w-[15px] h-[15px] absolute top-[-6px]  right-[30%] rounded-full bg-primary"> </div>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>

      <div className=" md:flex space-y-4 md:gap-x-10 bg-[#E9F0FF] p-16 px-4">
        <div className="flex md:w-[60%] w-[100%] flex-col overflow-hidden rounded-md">
          <div className="relative grow">
            <Image
              alt="Mountains"
              src={skyscrapper} // or your conditionally set src
              quality={100}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"  // Example: 100vw for small screens and 50vw for larger screens
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            <div className="absolute left-0 top-0 h-full w-full "></div>
            <div className="absolute bottom-0 z-20 flex flex-col gap-y-4 px-10 pb-10">

            </div>
          </div>
          <div className="grid gap-y-4 bg-[#ffffff] md:p-10 p-5">

            <h2 className="md:text-2xl text-xl font-semibold text-color-primary-blue ">
              {security?.data && security?.data[0]?.title}
            </h2>
            <p className="font-light">
              In today’s digital age, website security is crucial for businesses, especially in Information Technology and Civil Engineering. A secure website not only protects sensitive data but also builds trust with clients. Cyber threats like hacking and
            </p>
            <button className="py-3 px-4 rounded border border-[#B0B0B0] text-xs tracking-wide bg-tertiary font-medium uppercase text-[#000000] transition-all duration-150 hover:bg-[#151B54] hover:text-white">
              Read more
            </button>
          </div>
        </div>
        <div className="space-y-3 md:w-[40%] w-[100%]">
          {functionalCardData.map((data: any, i: any) => {
            return (
              <article
                key={i}
                className="flex items-center gap-x-4 rounded bg-white px-4 py-4 transition-all duration-150 hover:bg-[#151B54] hover:text-white"
              >
                <div className="rounded-full bg-[#E9F0FF] p-2 hover:bg-[#ffffff]">
                  <Image
                    // src={data.photo || maskIcon} 
                    src={maskIcon}
                    alt="i" width={30} height={30} style={{ width: "auto", height: "auto" }} />
                </div>
                <div className="">
                  <h3 className="font-semibold hover:font-bold">
                    {data.title}
                  </h3>
                  <p className="font-extralight">{data.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Service = async () => {
  const serviceData = await getServiceData();

  return (
    <div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        <div className="md:col-span-2 col-span-1 flex flex-col gap-y-3">
          <Line color={"#FFB200"} />
          <h2 className="text-2xl font-bold text-[#231F20]">Our Service</h2>
          <p className="mt-4 text-gray-500">
            We seamlessly integrate cutting-edge IT and civil engineering
            solutions to drive trans-formative results. Our expertise ensures
            robust infrastructure and advanced technology, delivering
            unparalleled quality and innovation that sets new industry
            standards.
          </p>
        </div>
        {serviceData.services?.map((d: any) => <ServiceCard data={d} key={d._id} />)}
      </section>
    </div>
  );
};
const Gallery = async () => {
  const serviceGallary = await getServiceGallary();
  const categories = [
    "All",
    "Home",
    "Road",
    "Bridge",
    "Electricity",
    "Airport",
    "Railway",
    "BridgeCraft",
    "CitySpan",
    "TrackLine",
    "MegaBridge",
    "SteelRail",
    "RouteWay",
    "TerraTrack",
  ];

  // Dummy images for demonstration
  const images = [
    { src: art, alt: "Art" },
    { src: parallel, alt: "Parallel" },
    { src: duplex, alt: "Duplex" },
    { src: oil, alt: "Oil" },
    { src: skyscrapper, alt: "Skyscrapper" },
    { src: house, alt: "House" },
  ];

  const renderImages = () => {
    const imageCount = images.length;

    if (imageCount === 1) {
      // Single image centered
      return (
        <div className="flex justify-center">
          <div className="group relative w-full max-w-[600px] rounded">
            <Image
              alt={images[0].alt}
              src={images[0].src}
              placeholder="blur"
              quality={100}
              // className="rounded-md"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
      );
    } else if (imageCount === 5) {
      // One image on the left, four on the right in a 2x2 grid
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
          {/* Left image */}
          <div className="group relative rounded md:col-span-1 md:row-span-2">
            <Image
              alt={images[0].alt}
              src={images[0].src}
              placeholder="blur"
              quality={100}
              // className="rounded-md"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          {/* Right images in a 2x2 grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
            {images.slice(1, 5).map((image, index) => (
              <div key={index} className="group relative rounded">
                <Image
                  alt={image.alt}
                  src={image.src}
                  placeholder="blur"
                  quality={100}
                  // className="rounded-md"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else if (imageCount > 5) {
      // First five images as above, remaining images in a grid below
      return (
        <div>
          {/* First five images */}
          <div className="mb-4 px-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left image */}
            <div className="group relative rounded md:col-span-1 md:row-span-2">
              <Image
                alt={images[0].alt}
                src={images[0].src}
                placeholder="blur"
                quality={100}
                // className="rounded-md"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            {/* Right images in a 2x2 grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
              {images.slice(1, 5).map((image, index) => (
                <div key={index} className="group relative rounded">
                  <Image
                    alt={image.alt}
                    src={image.src}
                    placeholder="blur"
                    quality={100}
                    // className="rounded-md"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Remaining images in a grid below */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.slice(5).map((image, index) => (
              <div key={index} className="group relative rounded">
                <Image
                  alt={image.alt}
                  src={image.src}
                  placeholder="blur"
                  quality={100}
                  // className="rounded-md"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Default grid for other cases
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative rounded">
              <Image
                alt={image.alt}
                src={image.src}
                placeholder="blur"
                quality={100}
                className="rounded-md"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section>
      <div className="pb-40">
        <div className="absolute flex h-[400px] w-full flex-col bg-color-primary-blue pt-8 text-white">
          <div className="h-100 flex flex-col place-items-center items-center justify-center gap-y-4 pb-10">
            <h2 className="text-2xl font-bold">Exclusive Service Gallery</h2>
            <p className="w-fit px-6 text-justify font-extralight">
              Discover what our clients say about our transformative IT and
              civil engineering solutions and project success
            </p>

            <div className="flex w-full max-w-full items-center justify-center gap-x-4 overflow-hidden px-6">
              <Slider data={categories} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 bg-tertiary px-6">{renderImages()}</div>

      <div className="bg-tertiary">
        <GlobeOrbit />
      </div>
    </section>
  );
};

const Project = async () => {

  const projectData = await getProjects()

  return (
    <section>
      <div className="mb-10 flex flex-col items-center gap-y-4">
        <Line />
        <h2 className="text-2xl font-bold text-[#222222]">OUR PROJECT</h2>
        <p>
          Discover what our clients say about our transformative IT and civil
          engineering solutions and project success
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* {data.project.map((d: ArchitectureDataProps) => (
          <ProjectCard data={d} image={camp} key={d._id} />
        ))} */}

        {/*  {projectData.projects.map((d: ArchitectureDataProps) => (
          <TemplateCard data={d} image={camp} key={d._id} />
        ))}*/}
      </div>

      {/* <div className="flex justify-center">
        <button className="mt-10 inline-block rounded bg-[#ffb200] px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white">
          SEE MORE
        </button>
      </div> */}
    </section>
  );
};

const Features = async () => {
  const architectureData = await getArchitectures()


  return (
    <section>
      <div className="mb-10  md:p-8 p-4 flex  flex-wrap  flex-row md:flex-col items-center gap-y-4 ">

        <h2 className="text-2xl font-bold">FEATURED Architecture</h2>
        <p className="font-extralight">
          Discover what our clients say about our transformative IT and civil
          engineering solutions and project success
        </p>
      </div>

      <div className=" w-full  p-10  md:grid   md:grid-cols-4 md:gap-6 ">
        {architectureData?.architectures?.map((d: ArchitectureDataProps) => (
          <FeaturesCard image={d.photo} key={d._id} data={d} />
        ))}
      </div>

      {/* <div className="flex justify-center">
        <button className="mt-10 inline-block rounded bg-[#ffb200] px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white">
          SEE MORE
        </button>
      </div> */}
    </section>
  );
};

const Feedback = async () => {
  const employeeData = await getEmployeeData();
  return (
    <section className="flex flex-col items-center pb-24">

      {/* Stretched Oval Container */}
      <div className="flex w-full flex-col items-center mt-[19px] px-14">
        {/* Oval Shape */}
        <div className="relative md:flex w-[100%] md:space-y-0 space-y-20 items-center justify-around rounded-full">
          {/* {[
            {
              image: "/default-avatar.png",
              name: "Nina Sanchez",
              title: "Architect",
              rating: 4,
            },
            {
              image: "/default-avatar.png",
              name: "Alex Turner",
              title: "Manager Director",
              rating: 5,
            },
            {
              image: "/default-avatar.png",
              name: "Emma Taylor",
              title: "Engineer",
              rating: 4,
            },
          ]?.map((item: any, index: number) => (   */}
          {/* {employeeData?.employees
  ?.filter((item: any) => item.isBestEmployee) 
  .slice(0, 3).map((item: any, index: number) => (  */}
          {employeeData?.employees
            ?.filter((item: any) => item.isBestEmployee)
            .slice(0, 3).map((item: any, index: number) => (

              <div
                key={index}
                className="group relative top-12 h-[300px] flex flex-col items-center"
              >


                <div className="max-w-5xl mx-auto text-center p-6">
                  <div className="text-left">
                    <h2 className="text-gray-800 text-lg font-light uppercase">OUR employees</h2>
                    <h1 className="text-3xl font-semibold text-gray-900">meet our <span className="text-blue-600">Employees</span></h1>
                  </div>

                  <div className="flex justify-center items-center mt-10 space-x-4">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden mx-auto">
                        <Image
                          alt={`${item.name}, ${item.title}`}
                          src={item.photo ? `data:image/png;base64,${item.photo}` : employeeImage}
                          width={90}
                          height={150}
                          className="h-full w-full object-cover group-hover:h-full group-hover:w-full group-hover:opacity-100"
                        />
                        {/* <img src="url('/background-squircle.png')" alt="Employee" className="w-full h-full object-cover" /> */}
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-800">Nina Sanchez</h3>
                      <p className="text-gray-500 text-sm">Architect</p>
                      <div className="flex justify-center mt-1 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden mx-auto">
                        <Image
                          alt={`${item.name}, ${item.title}`}
                          src={item.photo ? `data:image/png;base64,${item.photo}` : employeeImage}
                          width={90}
                          height={150}
                          className="h-full w-full object-cover group-hover:h-full group-hover:w-full group-hover:opacity-100"
                        />
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-800">Nina Sanchez</h3>
                      <p className="text-gray-500 text-sm">Architect</p>
                      <div className="flex justify-center mt-1 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full border-4 border-blue-600 overflow-hidden mx-auto">
                        <Image
                          alt={`${item.name}, ${item.title}`}
                          src={item.photo ? `data:image/png;base64,${item.photo}` : employeeImage}
                          width={90}
                          height={150}
                          className="h-full w-full object-cover group-hover:h-full group-hover:w-full group-hover:opacity-100"
                        />
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-800">Nina Sanchez</h3>
                      <p className="text-gray-500 text-sm">Architect</p>
                      <div className="flex justify-center mt-1 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden mx-auto">
                        <Image
                          alt={`${item.name}, ${item.title}`}
                          src={item.photo ? `data:image/png;base64,${item.photo}` : employeeImage}
                          width={90}
                          height={150}
                          className="h-full w-full object-cover group-hover:h-full group-hover:w-full group-hover:opacity-100"
                        />
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-800">Nina Sanchez</h3>
                      <p className="text-gray-500 text-sm">Architect</p>
                      <div className="flex justify-center mt-1 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden mx-auto">
                        <Image
                          alt={`${item.name}, ${item.title}`}
                          src={item.photo ? `data:image/png;base64,${item.photo}` : employeeImage}
                          width={90}
                          height={150}
                          className="h-full w-full object-cover group-hover:h-full group-hover:w-full group-hover:opacity-100"
                        />
                      </div>
                      <h3 className="mt-2 font-semibold text-gray-800">Nina Sanchez</h3>
                      <p className="text-gray-500 text-sm">Architect</p>
                      <div className="flex justify-center mt-1 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}



        </div>
      </div>
    </section>
  );
};


// Define a type for the blog
type Blog = {
  _id: string;
  title: string;
  description: string;
  photo: string;
  tag?: string;
  price: number;
  view: number;
  share: number;
  favourite: number;
  createdAt: string;
  __v: number;
};

// Function to get the latest 4 blogs
const getLatestBlogs = (blogs: Blog[]): Blog[] => {
  if (!blogs) return []
  return blogs
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    ?.slice(0, 4);
};


const News = async () => {

  const blogsData = await getBlogs()
  const latestBlogs = getLatestBlogs(blogsData);

  return (
    <section className="py-12 px-10 xl:px-20 bg-tertiary font-poppins">
      <div className="flex flex-col items-center md:pb-6 gap-y-4 px-6 mb-14">
        <h2 className="text-3xl font-bold text-primary mb-[7px]">FEATURED BLOG</h2>
        <p className="text-2xl leading-8 text-[#151B54] font-light text-center">
          Discover what our clients say about our transformatering sol <br />
          utions and project success
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 xl:gap-11 mb-5">
        {latestBlogs?.map((d: Blog) => (
          // <NewsCard data={d} key={d._id} />
          <BlogCard data={d} key={d._id} />
        ))}
      </div>

      {/* <div className="flex justify-center">
        <button className="mt-10 inline-block rounded border border-[#151B54] bg-[#151B54] px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#151B54]">
          SEE MORE
        </button>
      </div> */}
    </section>
  );
};

const Evidence = async () => {
  const employeeHiringData = await getEmployeeHiring();
  const counters = await getCounters()

  return (

    <div className="w-full relative">
      <div className="relative w-full min-h-[300px] bg-home-page-employeer-bg bg-center py-20 px-10">
        <div className="relative w-full flex flex-wrap  justify-center place-items-center">
          <div className="w-full  min-h-fit md:w-[60%] bg-color-transparent h-[30vh] flex px-28 py-10 flex-wrap md:flex-col sm:m-12 justify-center place-items-center text-white">
            <h1 className="text-3xl font-extrabold font-poppins mb-[22px]">{employeeHiringData?.data && employeeHiringData?.data[0]?.title}</h1>
            <p className="font-light leading-[30px] text-center mb-[32px]">{employeeHiringData?.data && employeeHiringData?.data[0]?.description}</p>
            <button className="text-sm font-semibold font-poppins text-white border border-[#B0B0B0] px-10 py-3 rounded-[5px]">READ MORE</button>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <News />
      </div>

      <section className="radius-15 rounded bg-color-primary-blue p-8 md:p-5 xl:py-20 text-color-accent-yellow flex  px-4">
        <ul className="w-full flex flex-wrap gap-10 justify-evenly gap-x-4">
          <li className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider gap-1 mb-2">{counters?.customers}</span>
            <p className="text-xl font-extralight uppercase">Customers</p>
          </li>

          <li className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider gap-1 mb-2">{counters?.completedOrders}</span>
            <p className="text-xl font-extralight uppercase">Completed projects</p>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider gap-1 mb-2">{counters.ourSupport}</span>
            <p className="text-xl font-extralight uppercase">Our support</p>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider gap-1 mb-2">{counters?.employers}</span>
            <p className="text-xl font-extralight uppercase">Employers</p>
          </li>
          <li className="flex flex-col items-center gap-1">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider mb-2">{counters?.agencies}</span>
            <p className="text-xl font-extralight uppercase">Agency</p>
          </li>
          <li className="flex flex-col items-center gap-1">
            <span className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider mb-2">10 Y+</span>
            <p className="text-xl font-extralight uppercase">Years of experience</p>
          </li>
        </ul>
      </section>
    </div>

  );
};


type Stakeholder = {
  _id: string;
  image: string;
  category: string;
  createdAt: string;
  __v: number;
};


const getFormattedImages = (
  stakeholders: { data: Stakeholder[] },
  altText: string
): any => {
  return stakeholders.data.map(item => ({
    src: item.image,
    alt: altText
  }));
};


const Sponsors = async () => {
  const stakeholders = await getData("admin/home/stakeholders/get")
  const formattedImages = getFormattedImages(stakeholders, "Lola company logo");

  return (
    <section className="">
      <div className="font-poppins">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2 xl:mb-5ss">Stakeholders</h2>
        <p className="text-md lg:text-lg xl:text-xl font-light xl:leading-9 text-[#00000066] mb-4 xl:mb-16">
          Companies benefiting from our expertise
          include leading firms
        </p>
      </div>
      <ImageSlider data={formattedImages} />
    </section>
  );
};

export default Home