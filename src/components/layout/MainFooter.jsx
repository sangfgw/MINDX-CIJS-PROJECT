import { Box, List, ListItem, Stack, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const StyledFooterWrapper = styled(Box)(() => ({
  background: "#111",
  color: "white",
  padding: "5rem 1.5rem" /* 24px */,
  marginTop: "10rem" /* 160px */,
}));

const StyledLogoTitle = styled(Typography)(() => ({
  fontSize: "4rem" /* 64px */,
}));

// -------
const AboutUs = () => (
  <Box sx={{ width: "500px" }}>
    <Typography variant="h4">About Us</Typography>
    <Typography variant="subtitle2" fontWeight={400} mt="1rem">
      Develop and building movie website by individual developer named
      &quot;Sang&quot;. This website used to display all movie that trending,
      popular and so on.
    </Typography>
  </Box>
);

const SOCIAL_ICONs = [
  {
    id: 1,
    Icon: FacebookIcon,
  },
  { id: 2, Icon: TwitterIcon },
  { id: 3, Icon: InstagramIcon },
];

const Socials = () => (
  <Box>
    <Typography variant="h4">Socials</Typography>
    <Stack direction="row" gap="10px" mt="1rem">
      {SOCIAL_ICONs.map((social) => (
        <SvgIcon component={social.Icon} key={social.id} />
      ))}
    </Stack>
  </Box>
);
// -------

const listitems = [
  {
    id: 1,
    content: "Phone: (+84) 327 833 610",
  },
  {
    id: 2,
    content: "Email: sang050901i@gmail.com",
  },
];

const Contact = () => (
  <Box sx={{ width: "300px" }}>
    <Typography variant="h4">Contact</Typography>
    <List>
      {listitems.map((item) => {
        return (
          <ListItem key={item.id} sx={{ px: 0 }}>
            <Typography variant="subtitle2" fontWeight={400}>
              {item.content}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  </Box>
);

const Copyright = () => (
  <Box sx={{ mx: "auto", width: "fit-content" }}>
    <Typography variant="subtitle2" fontWeight={400}>
      Copyright &copy; 2024 All Rights are Reserved by TM
    </Typography>
  </Box>
);

const MainFooter = () => {
  return (
    <StyledFooterWrapper>
      <Stack direction="row" gap="3rem" mb="6rem" flexWrap="wrap">
        <StyledLogoTitle>TM</StyledLogoTitle>
        <AboutUs />
        <Contact />
        <Socials />
      </Stack>
      <Copyright />
    </StyledFooterWrapper>
  );
};

export default MainFooter;
