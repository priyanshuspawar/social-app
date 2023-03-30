import { Avatar, Box } from "@mui/material";
import React from "react";

const UserImage = ({ alt, image }) => {
  return (
    <Box mr={"0.8rem"}>
      <Avatar
        sx={{ width: 60, height: 60 }}
        alt={alt}
        src={`http://localhost:3500/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
