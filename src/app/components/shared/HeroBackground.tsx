import Image from 'next/image';
import Overlay from './Overlay';

interface HeroBackgroundProps {
  image: string;
  children: React.ReactNode;
}

export default function HeroBackground({
  image,
  children,
}: HeroBackgroundProps) {
  return (
    <div className="relative h-screen rounded-md overflow-hidden">
      <Image
        src={image}
        alt=" Hero Background Image"
        quality={100}
        placeholder="blur"
        fill
        objectFit="fill"
      />
      <Overlay />
      <div className="absolute z-10 inset-0 flex justify-center items-center ">
        {children}
      </div>
    </div>
  );
}
