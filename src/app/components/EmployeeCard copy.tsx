import Image from "next/image";
import anthony from "../../public/anthony.png";

function EmployeeCard() {
  return (
    <article className="flex flex-col items-center gap-y-2 rounded-lg bg-[#B0B0B080] py-6">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#ffb200]">
        <Image
          alt="Mountains"
          src={anthony}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover"  // Maintain the image's aspect ratio while covering the entire container
          }}
        />

      </div>

      <div className="h-6 w-[3px] bg-[#ffb200] group-hover:bg-black" />

      <div className="mb-4 text-center">
        <h3 className="text-xl font-semibold text-[#0F0D69]">Nina Sanchez</h3>
        <p>Project Manager</p>
      </div>

      <div></div>
    </article>
  );
}

export default EmployeeCard;
