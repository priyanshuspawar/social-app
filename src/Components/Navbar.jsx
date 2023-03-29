import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  InputBase,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
  Tooltip,
  Avatar
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../app/features/data";

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


  //dropdown constants
  const [anchorEl,setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event)=>{
    setAnchorEl(event.currentTarget);
  }
  const handleClose = ()=>{
    setAnchorEl(null);
  }


  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;

  //handlers
  const modeHandler = () => {
    dispatch(setMode());
  };

  return (
    <Box
      width={"full"}
      height={"4rem"}
      sx={{
        bgcolor: alt,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 6%",
      }}
    >
      <Typography
        color={"primary"}
        sx={{fontWeight: "bold", flexGrow:{sm:1,xs:1,lg:"initial",md:"initial"}}}
        fontSize="clamp(1.5rem,1.8rem,1.5rem)"
      >
        SocialPedia
      </Typography>

      {/* input field */}
      <Box
        bgcolor={neutralLight}
        borderRadius="9px"
        gap={"3rem"}
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          p: "0.1rem 1.1rem",
          flexDirection: "row",
          alignItems: "center",
          ml:{xl: "18rem"}
        }}
        // flexGrow={1}
      >
        <InputBase placeholder="Search..."/>
        <IconButton>
          <Search />
        </IconButton>
      </Box>
      <Box gap={"2rem"} sx={{ display: "flex", alignItems: "center"}}>
        <IconButton onClick={modeHandler}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton sx={{ display: { md: "flex", sm: "none", xs: "none" } }}>
          <Message sx={{ color: dark, fontSize: "25px" }} />
        </IconButton>
        <IconButton sx={{ display: { md: "flex", sm: "none", xs: "none" } }}>
          <Notifications sx={{ color: dark, fontSize: "25px" }} />
        </IconButton>
        <IconButton sx={{ display: { md: "flex", sm: "none", xs: "none" } }}>
          <Help sx={{ color: dark, fontSize: "25px" }} />
        </IconButton>
      </Box>
      

      {/* dop down menu */}

      <Box display={"flex"}>
      <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 30, height: 30,bgcolor:dark }}>M</Avatar>
          </IconButton>
        </Tooltip>
      



      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        id="account-menu"
        open={open}
        PaperProps={{
          elevation:0,
          sx:{
            overflow: "hidden",
            filter: "drop-shadow(0px, 2px , 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root":{
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> My Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Notfications
        </MenuItem>
      </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
