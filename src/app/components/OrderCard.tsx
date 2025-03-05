import Image from "next/image";
import { ArchitectureDataProps } from "../(landing-pages)/real-estate/definition";
import OrderNowButton from "./OrderNowButton";
import canoe from "/public/canoe.jpg";

function OrderCard({ data }: { data: ArchitectureDataProps }) {
  return (
    <article className="group hover:bg-primary rounded-lg border border-gray-300 bg-white p-6">
      {/* Title Section */}
      <h3 className="group-hover:text-white text-xl mb-4 px-2 py-1 font-semibold text-black leading-relaxed text-left">
        {data.title}
      </h3>

      {/* Image Section */}
      <div className="flex justify-center">
        <Image src={canoe} alt="order card image" className="mb-4" />
      </div>

      {/* Order Button Section */}
      <div className="flex justify-center">
        <OrderNowButton
          orderid={data._id}
          className="text-lg p-3 group-hover:bg-white border border-primary rounded-md"
        />
      </div>
    </article>

  );
}

export default OrderCard;
