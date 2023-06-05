import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSession } from '../../contexts/SessionContext';

import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { NavLink } from "react-router-dom";

/* const Search = styled("div")(({ theme }) => ({
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
})); */

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
    // display: "none",
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

const pages = [
  { linkName: "景點探索", linkURL: "/searchSpot" },
  { linkName: "找美食", linkURL: "/searchFood" },
  { linkName: "找住宿", linkURL: "/searchHotel" },
  { linkName: "規劃行程", linkURL: "/規劃" },
];

const settings = [
  { linkName: "Profile", linkURL: "/profile", click:"#" },
  { linkName: "Account", linkURL: "/account", click:"#" },
  { linkName: "Dashboard", linkURL: "/dashboard", click:"#" },
  // { linkName: "Logout", linkURL: "#" , click:"handleLogout"}
];
const setting1 = [
  { linkName: "login", linkURL: "/login" },
  { linkName: "register", linkURL: "/register" }
];

function NavBar() {
  const { a_Id, m_Id, a_Account, a_Level,logout } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ModeOfTravelIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            台南走透透
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.linkURL} onClick={handleCloseNavMenu}>
                  <NavLink>
                    <Typography textAlign="center">{page.linkName}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ModeOfTravelIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AI旅遊
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page.linkURL}
                to={page.linkURL}
                onClick={handleCloseNavMenu}
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "1rem",
                }}
              >
                <Typography textAlign="center">{page.linkName} </Typography>

                {/* <Button
                  
                  
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button> */}
              </NavLink>
            ))}
          </Box>

          {/* <Box sx={{ display: { md: "block", xs: "none" }, mr: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box> */}

          {/* <Box sx={{ display: { md: "none", xs: "block" }, mr: 2 }}>
           
          </Box> */}
          {a_Account?(
            <Box sx={{ flexGrow: 0, display: "flex" }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ display: { md: "none", xs: "block" } }}
            >
              <SearchIcon />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                { (
                <div>
                  {a_Account}
                </div>
              )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.linkURL} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.linkName}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>logout</MenuItem>
            </Menu>
          </Box>
        
          ):( 
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ display: { md: "none", xs: "block" } }}
            >
              <SearchIcon />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {setting1.map((setting) => (
                <MenuItem key={setting.linkURL} onClick={handleCloseNavMenu}>
                  <NavLink to={setting.linkURL}>
                    <Typography textAlign="center">{setting.linkName}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
  </Toolbar>
      </Container>
    </AppBar>
);
}
export default NavBar;


