// Func: generate random video trailer
export const generateRandomTrailerVideoId = (videos) => {
  if (!videos || !videos.length > 0) return;
  // console.log(videos);
  const randomIndex = Math.floor(Math.random() * (videos.length - 1));

  // console.log(randomIndex);
  return videos[randomIndex]?.key;
};
