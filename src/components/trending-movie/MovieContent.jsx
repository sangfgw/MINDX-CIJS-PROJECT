import { Box } from "@mui/material";
import { styled } from "@mui/system";

const MovieContent = styled(Box)(({ theme }) => ({
  background:
    "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 90.2%)",

  padding: "2rem",
  flex: 1.5,
  minHeight: "600px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  userSelect: "text",
  marginBottom: "-1rem",

  // Breakpoints
  [theme.breakpoints.up("lg")]: {
    paddingRight: "10rem" /* 160px */,
  },

  [theme.breakpoints.down("xs")]: {
    paddingRight: "2rem" /* 32px */,
  },
}));

export default MovieContent;
