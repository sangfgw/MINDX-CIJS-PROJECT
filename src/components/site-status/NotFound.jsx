import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

// Styled Component
const StyledNotFoundWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const StyledNotFoundMessage = styled(Typography)(() => ({
  fontSize: "4rem" /* 64px */,
  fontWeight: "bold",
  color: "whitesmoke",
  fontFamily: "serif",
}));

const StyledReturnButton = styled(Button)(() => ({
  ":hover": {
    color: "white",
  },
}));

// Main Component
const NotFound = () => {
  return (
    <StyledNotFoundWrapper>
      <StyledNotFoundMessage>
        Error 404: Your Resource Not Found!
      </StyledNotFoundMessage>
      <StyledReturnButton
        variant="contained"
        color="primary"
        size="large"
        href="/"
      >
        Return To Home Page
      </StyledReturnButton>
    </StyledNotFoundWrapper>
  );
};

export default NotFound;
