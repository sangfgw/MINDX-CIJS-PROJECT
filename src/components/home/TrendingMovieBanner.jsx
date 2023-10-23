import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";
import stranger_things_image from "../../assets/images/stranger_things.jpg";
import YoutubeEmbed from "../video/YoutubeEmbed";

const TrendingMovieWrapper = styled(Box)(() => ({
  marginBottom: "1rem" /* 16px */,
  marginTop: "-1.5rem",
  marginInline: "-1.5rem" /* 24px */,
  position: "relative",
  backgroundImage: `url('${stranger_things_image}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  userSelect: "none",
  display: "flex",
  flexWrap: "wrap",
}));

const StyledMovieContent = styled(Box)(() => ({
  background:
    "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 90.2%)",

  padding: "2rem",
  flex: 1,
  height: "600px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const StyledTitleTrending = styled(Typography)(() => ({
  fontSize: "5rem" /* 80px */,
  fontWeight: "bold",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  textAlign: "center",
  fontFamily: "serif",
  lineHeight: 1.2,
}));

const StyledDescTrending = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  marginBottom: "2rem",
}));

const StyledWatchButton = styled(Button)(() => ({
  display: "block",
  marginInline: "auto",
  color: "white",
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

const StyledVideoWrapper = styled(Box)(() => ({
  // background:
  //   "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 90.2%)",
  flex: 3,
  height: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& .embed-wrapper": {
    transform: "translateY(-5%)",
  },
}));

const TrendingMovieBanner = () => {
  return (
    <>
      <TrendingMovieWrapper>
        <StyledMovieContent sx={{ pr: { xs: "2rem", lg: "10rem" } }}>
          <StyledTitleTrending>Stranger Things</StyledTitleTrending>
          <StyledDescTrending>
            When a young boy vanishes, a small town uncovers a mystery involving
            secret experiments, terrifying supernatural forces and strange
            little girl.
          </StyledDescTrending>
          <StyledWatchButton variant="contained" size="large">
            Watch Now!
          </StyledWatchButton>
        </StyledMovieContent>
        <StyledVideoWrapper>
          <YoutubeEmbed embedId="74lKim237ZI" />
        </StyledVideoWrapper>
      </TrendingMovieWrapper>
    </>
  );
};

export default TrendingMovieBanner;
