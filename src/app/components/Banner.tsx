import Image from 'next/image'

type BannerType = {
    text1: string,
    text2: string,
    text3: string,
    text4:string,
    description:string,
    image:string
  
}

const Banner = ({text1, text2,text3,text4,description,image}: BannerType) =>{
    return (
      <>
        <div className="flex w-full flex-wrap justify-center gap-8 bg-[#151854] text-white md:p-8 lg:justify-between lg:p-12">
          <div className="w-full space-y-4 px-2 py-5 lg:w-[50%] lg:p-0">
            {/* <Line /> */}
            <h1 className="text-xl font-semibold capitalize sm:text-4xl md:leading-[48px]">
              {text1}
              <span className="leading-4 text-color-primary-lighter-blue">
               
                {text2}
              </span>
              &<span className="text-[#ffb200]"> {text3} </span>
            </h1>
            <h1>{text4}</h1>
            <p className="max-w-[100%] pb-6 text-lg font-normal md:max-w-[80%] md:leading-[35px]">
              {description && description != ""
                ? description
                : " We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and "}
            </p>
          </div>
          <div className=" w-[90%] md:w-[30%] lg:w-[40%]">
            <Image
              src={
                image &&
                image.includes("https://") &&
                !image.includes("example.com")
                  ? image
                  : "/banner.png"
              }
              width={1000}
              height={200}
              alt="Gallery-Banner-img"
              priority
            />
          </div>
        </div>
      </>
    );
}

export default Banner