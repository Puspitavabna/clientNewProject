export default function Line({
  // color = "#151B54",
  // color = '#0E63FF',
  color = '#FFB013',
  width = '80px',
}: {
  color?: string;
  width?: string;
}) {
  return (
    <div
      className={`h-1 rounded-full`}
      style={{ background: color, width: width }}
    />
  );
}
