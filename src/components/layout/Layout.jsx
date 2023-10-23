/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
      <MainFooter />
    </>
  );
};

export default Layout;
