
import { StaticImageData } from "next/image";
import MediaGallery from "../../components/MediaGallery";
import NewHero from "@/src/app/components/NewHero";
import Paginate from "@/src/app/components/Pagination";
import Slider from "../../components/Slider";
import discuss from "/public/discuss.jpg";
import duplex from "/public/duplex.jpg";
import estate from "/public/estate.jpg";
import parallel from "/public/parallel.jpg";
import rally from "/public/rally.jpg";
import skyfaced from "/public/skyfaced.jpg";
import team from "/public/team.jpg";
import gallery1 from "../../../../public/big-gallery-1.png"
import gallery2 from "../../../../public/gallery-2.png"
import gallery3 from "../../../../public/gallery-3.png"
import gallery4 from "../../../../public/gallery-4.png"
import gallery5 from "../../../../public/gallery-5.png"
import gallery6 from "../../../../public/gallery-6.png";

export default function GalleryPage() {
  let orders = new Array(12).fill(undefined)

  const categories = [
    "All",
    "Education",
    "green building",
    "health care",
    "interior design",
    "office",
    "road construction",
    "Civil engineering",
    "Healthcare",
    "Neuroscience",
  ];
  type MediaItem = {
    type: "image" | "video"; // Only "image" or "video"
    src: StaticImageData | string;
    title: string; // StaticImageData for images, string for video URL
  };
  //const images = [duplex, team, rally, estate, discuss, parallel]
  const mediaItems: MediaItem[] = [
    { type: "image", src: duplex , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: team , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: rally , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: estate , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: discuss , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: parallel , title:"Stadium square"}, // StaticImageData for image
    // { type: "video", src: "https://www.youtube.com/embed/xwASG8hmeSM" , title:"Stadium square"}, // Video URL (string)
  ];
  const galleryItems= [
    { type: "image", src: gallery1 , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: gallery2 , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: gallery3 , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: gallery4 , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: gallery5 , title:"Stadium square"}, // StaticImageData for image
    { type: "image", src: gallery6 , title:"Stadium square"}, // StaticImageData for image
    // { type: "video", src: "https://www.youtube.com/embed/xwASG8hmeSM" , title:"Stadium square"}, // Video URL (string)
  ];


  return (
    <>
    <header className="flex flex-col gap-y-4 bg-tertiary">
        {/* <header className="flex flex-col gap-y-4 bg-[#231B7D] px-4 pb-10"> */}
        <NewHero image={skyfaced} title=" SERVICE GALLERY" desc="We deliver innovative solutions in Information Technology and Civil Engineering, creating sustainable and efficient projects worldwide. Our expertise transforms industries, enhances communities, and sets new standards for quality and " />
      </header>


      <main className="bg-gradient-to-br from-[#E6EDFC] to-[#E6EDFC] p-14 pt-18">
          <Slider data={categories} />
        <section className="mt-20 mb-20">
          <MediaGallery media={mediaItems} />{" "}
          {/* Pass media data to the client component */}
        </section>
        <Paginate />
      </main>
    </>
  );
}
