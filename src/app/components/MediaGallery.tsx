"use client";

import Image, { StaticImageData } from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAll } from "../store/actions/allPagesActions/pagesActions";
import { RootState } from "../store/store";
import { bindActionCreators } from "redux";
// Define a type for each media item
type MediaItem = {
  title: string;
  type: "image" | "video"; // "image" or "video"
  src: StaticImageData | string; // URL for the image or video (can be an image URL or video URL)
};

// Define the props for MediaGallery component
type MediaGalleryProps = {
  media: MediaItem[]; // Array of media items
};



// MediaGallery component
export default function MediaGallery({ media }: MediaGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const dispatch = useDispatch()
  const projecs: any = useSelector((state: RootState) => state.data.data)
  const loading: any = useSelector((state: RootState) => state.data.loading)

  // const actions = bindActionCreators
  const actions = useMemo(() => bindActionCreators({ getAll }, dispatch), [dispatch]);
  const openModal = (mediaItem: MediaItem) => {
    setSelectedMedia(mediaItem);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setModalOpen(false);
  };
  useEffect(() => {
    actions.getAll('technical/all', 'data')
  }, [actions])

  return (
    <div className="">
      <section className="grid grid-cols-4 gap-6">
        {media.map((item, i) => (
          <div
            key={i}
            onClick={() => openModal(item)} // Open modal on click
            className="group relative flex cursor-pointer flex-col gap-2 rounded-lg   shadow-md  transition-all hover:shadow-lg"
          >
            

            {/* Media content (Image or Video) */}
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={`Gallery item ${i + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[200px] w-full items-center justify-center bg-gray-300 transition-all group-hover:h-[220px] rounded-md">
                <span className="text-4xl text-gray-700">▶</span> {/* Play icon for video */}
              </div>
            )}

            
          </div>



        ))}
      </section>

      {modalOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative h-[80vh] max-h-[80vh] w-full max-w-6xl rounded-lg bg-white">
            <button
              onClick={closeModal}
              className="z-60 absolute right-2 top-2 text-4xl text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            {selectedMedia.type === "image" &&
              typeof selectedMedia.src === "string" ? (
              <Image
                src={selectedMedia.src}
                alt="Selected media"
                fill
                className="h-full w-full object-cover"
              />
            ) : typeof selectedMedia.src === "string" &&
              selectedMedia.src.includes("youtube.com") ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedMedia.src as string}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
                className="h-full w-full object-cover" // Ensure full cover
              ></iframe>
            ) : (
              <video
                src={selectedMedia.src as string}
                className="h-full w-full object-cover"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
