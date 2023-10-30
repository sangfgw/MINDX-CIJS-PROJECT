import { Box } from "@mui/material";
import { styled } from "@mui/system";

const VideoWrapper = styled(Box)(() => ({
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

export default VideoWrapper;
