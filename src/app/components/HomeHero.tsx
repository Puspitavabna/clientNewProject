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
      <div className="relative h-[653px] w-full items-center text-white sm:flex">
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

        <div className="z-20 flex flex-col items-start gap-y-5 rounded-none px-5 py-8 sm:rounded-[40px] sm:px-20">
          {children}
        </div>
      </div>
    </section>
  );
}
