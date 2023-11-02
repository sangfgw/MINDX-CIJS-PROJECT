/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import { red } from "@mui/material/colors";
import Slide from "@mui/material/Slide";
import useDebounce from "../../hooks/useDebounce";
import GenresContext from "../../contexts/GenresContext";

// Initialize Variables
const drawerWidth = 240;
const navItems = [
  { content: "Home", href: "/", type: "link" },
  {
    content: "Category",
    href: "/category",
    type: "dropdown",
    children: <p>Dropdown</p>,
  },
];

// Styled Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledLink = styled(Link)(() => ({
  color: "black",
  ":hover": {
    color: "unset",
  },
}));

const StyledDropdown = styled(Box)(() => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  padding: "1.5rem" /* 24px */,
  backgroundColor: "black",
  minHeight: "200px",
  maxHeight: "calc(100vh - 56px)",
  overflowY: "auto",
}));

const StyledDropDownLink = styled(Link)(() => ({
  color: "whitesmoke",

  ":hover": {
    color: red[700],
  },
}));

const StyledNavButton = styled(Button)(() => ({
  color: "rgb(255,255,255)",
  ":hover": {
    color: "rgba(255,255,255, 0.75)",
    backgroundColor: "unset",
  },
}));

const StyledSiteLogoLink = styled(Link)(() => ({
  color: red[600],
  fontWeight: "bold",
  ":hover": {
    color: red[800],
  },
}));

// MUI THEME
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

// Main Component
const MainHeader = () => {
  const genresContext = React.useContext(GenresContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef();
  const searchDebouncedValue = useDebounce(searchValue, 1000);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropDown, setOpenDropDown] = React.useState(false);

  React.useEffect(() => {
    if (searchDebouncedValue !== "") {
      // console.log(searchDebouncedValue);
      navigate(`/search?query=${searchDebouncedValue}`);
    }
  }, [searchDebouncedValue]);

  React.useEffect(() => {
    document.body.style.overflow = openDropDown ? "hidden" : "unset";
  }, [openDropDown]);

  // React.useEffect(() => {
  //   if (state.genres && state.genres.length > 0) return;
  //   // const genresPromise = getGenres();
  //   genresPromise.then((genresData) =>
  //     dispatch({ type: "genres", payload: genresData.genres })
  //   );
  //   // console.log("Called");
  // }, []);

  React.useEffect(() => {
    if (!location.pathname.includes("/search")) {
      setSearchValue("");
      // console.log(location.pathname, inputRef.current.value);
      inputRef.current.value = "";
    }
  }, [location.pathname]);

  const updateSearchValueHandler = (e) => {
    setSearchValue(e.target.value);
    // console.log(e.target.value);
  };

  const handleOpenDropDown = () => {
    setOpenDropDown(true);
  };

  const handleCloseDropDown = () => {
    setOpenDropDown(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: "bold", color: red[500] }}
      >
        MOVIE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) =>
          item.type.includes("dropdown") ? (
            <ListItem disablePadding key={item.content}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleOpenDropDown}
              >
                <ListItemText primary={item.content} />
              </ListItemButton>
            </ListItem>
          ) : (
            <StyledLink to={item.href} key={item.content}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.content} />
                </ListItemButton>
              </ListItem>
            </StyledLink>
          )
        )}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const loadDropDownLinks = () => {
    return (
      genresContext.length > 0 && (
        <Grid container spacing={4}>
          {genresContext.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id}>
              <StyledDropDownLink
                to={`/category/${item.name}`}
                onClick={handleCloseDropDown}
              >
                <Typography display="inline-flex">{item.name}</Typography>
              </StyledDropDownLink>
            </Grid>
          ))}
        </Grid>
      )
    );
  };

  // Custom Component
  const DropDownButton = ({ title }) => {
    return (
      <StyledNavButton onClick={handleOpenDropDown}>{title}</StyledNavButton>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Move Theme to App.jsx-------------------------------------------------------------------- */}
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <StyledSiteLogoLink to="/">MOVIE</StyledSiteLogoLink>
            </Typography>
            <Search sx={{ mr: { sm: "1rem" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={updateSearchValueHandler}
                onLoad={updateSearchValueHandler}
                inputRef={inputRef}
              />
            </Search>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) =>
                item.type.includes("dropdown") ? (
                  <DropDownButton title={item.content} key={item.content} />
                ) : (
                  <StyledLink key={item.content} to={item.href}>
                    <StyledNavButton>{item.content}</StyledNavButton>
                  </StyledLink>
                )
              )}
            </Box>
          </Toolbar>

          <Slide direction="left" in={openDropDown} mountOnEnter unmountOnExit>
            <Box>
              <ClickAwayListener onClickAway={handleCloseDropDown}>
                <StyledDropdown>{loadDropDownLinks()}</StyledDropdown>
              </ClickAwayListener>
            </Box>
          </Slide>
        </AppBar>
      </ThemeProvider>

      <Stack flexDirection="column">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Stack>
    </Box>
  );
};

MainHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainHeader;
