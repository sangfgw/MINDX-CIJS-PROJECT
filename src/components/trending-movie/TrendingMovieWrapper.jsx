import { Box } from "@mui/material";
import { styled } from "@mui/system";

const TrendingMovieWrapper = styled(Box)(({ imagesource }) => ({
  marginBottom: "1rem" /* 16px */,
  marginTop: "-1.5rem",
  marginInline: "-1.5rem" /* 24px */,
  position: "relative",
  backgroundImage: `url('${imagesource}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  userSelect: "none",
  display: "flex",
  flexWrap: "wrap",
  paddingBottom: "1rem" /* 16px */,
}));

export default TrendingMovieWrapper;
