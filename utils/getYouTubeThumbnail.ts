export const getYouTubeThumbnail = (url: string) => {
  // Extract the video ID from the embed URL
  const videoIdMatch = url.match(
    /(?:embed\/|v=|vi\/|watch\?v=|youtu\.be\/)([^\s&]+)/,
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) return null; // Return null if no video ID found

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Return high-quality thumbnail
};
