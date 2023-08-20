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
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  // { linkName: "Profile", linkURL: "/profile" },
  { linkName: "interest", linkURL: "/interest" },
  { linkName: "Dashboard", linkURL: "/dashboard" },
  // { linkName: "Logout", linkURL: "#" , click:"handleLogout"}
];
const setting1 = [
  { linkName: "login", linkURL: "/login" },
  { linkName: "register", linkURL: "/register" }
];

function NavBar() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const {id,account,username,email,access,refresh, login, logout } = useSession();
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [formData, setFormData] = useState({
    id:id,
    account: account,
    username: username,
    email: email,
  });

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setError('');
    setErrors({});
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async(e)=> {
    e.preventDefault();
    const formErrors = validateForm(formData);
  if (Object.keys(formErrors).length === 0) {
    try{
      const response=await axios.post('http://127.0.0.1:8000/api/account-change/', formData);
      if (response.data.message==="會員更新成功") {
       login(response.data.id, response.data.account, response.data.username, response.data.email,access,refresh);
        setError(response.data.message);
      } else {
        setError(response.data.message);
      }
    }catch (err) {
      setError('會員更新失敗');
    }
   } else {
    setErrors(formErrors);
  }
  }
const validateForm = (data) => {
  	const errors = {};
  	if (!data.account) {
    	errors.account = '請輸入帳號';
 	 } 
  	if (!data.username) {
    	errors.username= '請輸入用戶名';
  	} 
    if (!data.email) {
    	errors.email = '請輸入電子信箱';
  	} 

  	return errors;
	};



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
          {account?(
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
                  {username}
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
               <MenuItem onClick={handleClickOpen}>profile</MenuItem>
              <form >
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">會員資訊</DialogTitle>
        <DialogContent>
            <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="account"
            label="帳號"
            name="account"
            value={formData.account}
            autoFocus
            onChange={handleInputChange}
          />
          <Typography color="error">{errors.account}</Typography>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            label="用戶名"
            name="username"
            value={formData.username}
            autoFocus
            onChange={handleInputChange}
          />
          <Typography color="error">{errors.username}</Typography>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="電子信箱"
            name="email"
            value={formData.email}
            autoFocus
            onChange={handleInputChange}
          />
          <Typography color="error">{errors.email}</Typography>
           <Typography color="error">{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            關閉
          </Button>
          <Button type='submit' onClick={handleSubmit} color="primary">
            變更
          </Button>
         
        </DialogActions>
      </Dialog>
    </form>
                  {settings.map((setting) => (
                <MenuItem key={setting.linkURL} onClick={handleCloseUserMenu}>
                  <NavLink to={setting.linkURL}>
                    <Typography textAlign="center">{setting.linkName}</Typography>
                  </NavLink>
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


