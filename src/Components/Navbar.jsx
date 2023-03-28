import {
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  InputBase,
  IconButton,
  Hidden,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../app/features/data";

const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
      <Typography sx={{display:{md:"flex",sm:"none",xs:"none"}}}>SocialPedia</Typography>
      <Box
        bgcolor={neutralLight}
        borderRadius="9px"
        gap={"3rem"}
        sx={{
          display:{md:"flex",xs:"none",sm:"none"},
          padding: "0.1rem 1.5rem",
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputBase placeholder="Search ..."/>
        <IconButton>
          <Search />
        </IconButton>
      </Box>
      <Box gap={"2rem"} sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={modeHandler}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <IconButton sx={{display:{md:"flex",sm:"none",xs:"none"}}}>
          <Message sx={{color: dark, fontSize: "25px", }} />
        </IconButton>
        <IconButton>
          <Notifications sx={{color: dark, fontSize: "25px" }} />
        </IconButton>
        <IconButton sx={{display:{md:"flex",sm:"none",xs:"none"}}}>
          <Help sx={{color: dark, fontSize: "25px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
