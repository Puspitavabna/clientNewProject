import React from "react";
import { GiNetworkBars } from "react-icons/gi";


interface CardProps {
  color?: string;
  title: string;
  value: string;
}

//function Card({ title }: { color?: string; title: string }) {
 function Card({ title, value, color }: CardProps) {

  return (
    <article className="rounded-md px-4 py-2 bg-[#ffffff] hover:bg-[#151B54] flex justify-between gap-x-6 text-black hover:text-white">
      <h3 className="font-semibold text-xs capitalize">{title}</h3>
      <div className="grid gap-y-4">
        <GiNetworkBars />
        <p className="text-right font-bold">{value}</p>
      </div>
    </article>
  );
}

export default Card;
