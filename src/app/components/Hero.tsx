import Image from "next/image";
import Overlay from "./Overlay";

export default function Hero({
  image,
  children,
}: {
  image: any;
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <div className="relative h-[653px] w-full items-center overflow-hidden rounded-md text-white sm:flex">
        <Image
          alt="Background image"
          src={image}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover",
          }}
        />

        <Overlay />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-y-5 px-5 py-8 sm:rounded-[40px] sm:px-20">
          {children}
        </div>
      </div>
    </section>
  );
}
