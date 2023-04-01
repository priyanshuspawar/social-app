import { Box, Typography, useTheme, Divider } from "@mui/material";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "../Components/UserImage";

const UserWidget = ({data}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.persistedReducer.token);
  const user = useSelector((state) => state.persistedReducer.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    picturePath,
    friends,
  } = data?data:user;

  return (
    <Box
      bgcolor={palette.background.alt}
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
    >
      {/* name and image flex */}
      <Box display={"flex"} alignItems={"center"} mb="0.5rem">
        <UserImage alt={firstName} image={picturePath} />
        <Box>
          <Typography variant="h5" color={dark} fontWeight="200">
            {`${firstName[0].toUpperCase()}${firstName.slice(
              1,
              firstName.length
            )} ${lastName}`}
          </Typography>
          <Typography color={medium}>{friends.length} Friends</Typography>
        </Box>
      </Box>

      <Divider />
      {/* location and occupation row */}
      <Box p={"1rem 0"}>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined />
          <Typography sx={{fontSize:"0.7rem"}} color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined />
          <Typography sx={{fontSize:"0.7rem"}} color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* views and impressions row */}
      <Box p={"1rem 0"} >
        <Box display={"flex"} justifyContent="space-between" mb={"0.5rem"}>
          <Typography color={medium} sx={{fontSize:"0.7rem"}}>Profile Views</Typography>
          <Typography sx={{fontSize:"0.7rem"}}>{Math.round(viewedProfile * 100)}</Typography>
        </Box>
        <Box display={"flex"} justifyContent="space-between">
          <Typography color={medium} sx={{fontSize:"0.7rem"}}>Impressions of Posts</Typography>
          <Typography sx={{fontSize:"0.7rem"}}>{Math.round(impressions * 100)}</Typography>
        </Box>
      </Box>
      <Divider />

      <Typography color={main}>Social Media</Typography>
      {/* socials row */}
      <Box>
        {/* twitter */}
        <Box
          display={"flex"}
          p={"0.4rem 0"}
          alignItems={"center"}
          gap={"0.4rem"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            justifyContent="center"
            alignItems="center"
            fill={main}
          >
            <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"></path>
          </svg>
          <Box flexGrow={1}>
            <Typography color={main} fontSize={"0.8rem"}>
              Twitter
            </Typography>
            <Typography color={medium} fontSize={"0.6rem"}>
              Social Network
            </Typography>
          </Box>
          <EditOutlined />
        </Box>
        <Box
          display={"flex"}
          p={"0.4rem 0"}
          alignItems={"center"}
          gap={"0.4rem"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            fill={main}
            height="25"
            viewBox="0 0 50 50"
          >
            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
          </svg>
          <Box flexGrow={1}>
            <Typography color={main} fontSize={"0.8rem"}>
              Linkedin
            </Typography>
            <Typography color={medium} fontSize={"0.6rem"}>
               Network Platform
            </Typography>
          </Box>
          <EditOutlined />
        </Box>
      </Box>
    </Box>
  );
};

export default UserWidget;
