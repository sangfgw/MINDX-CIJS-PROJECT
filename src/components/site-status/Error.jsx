import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

// Styled Component
const StyledErrorWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const StyledErrorMessage = styled(Typography)(() => ({
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

const Error = () => {
  return (
    <StyledErrorWrapper>
      <StyledErrorMessage>Error Occurs</StyledErrorMessage>
      <StyledReturnButton
        variant="contained"
        color="primary"
        size="large"
        href="/"
      >
        Return To Home Page
      </StyledReturnButton>
    </StyledErrorWrapper>
  );
};

export default Error;
