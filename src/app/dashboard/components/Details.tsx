function Details({ label, data }: { label: string; data: string }) {
  return (
    <article className="flex items-end justify-between gap-x-4 border-b border-b-[#373535]/50 px-4 pb-1 font-semibold last:border-b-0 last:pb-0">
      <p className="w-3/5 text-[#373535]">{label}</p>
      <p className="w-2/5 text-sm">{data}</p>
    </article>
  );
}

export default Details;
