/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledEmbedWrapper = styled(Box)(() => ({
  width: "clamp(200px, 100%, 800px)",
  minWidth: "200px",
  height: "450px",
  marginInline: "1.5rem",
}));

const YoutubeEmbed = ({ embedId }) => {
  return (
    <StyledEmbedWrapper className="embed-wrapper">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}?autoplay=0&loop=1&modestbranding=1&rel=0&controls=0&disablekb=1&playlist=${embedId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </StyledEmbedWrapper>
  );
};

export default YoutubeEmbed;
