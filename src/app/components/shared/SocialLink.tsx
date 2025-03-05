import Link from 'next/link';

const SocialLink = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ffffff] text-xl"
    >
      {children}
    </Link>
  );
};

export default SocialLink;
