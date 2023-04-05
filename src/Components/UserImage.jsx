import { Avatar, Box } from "@mui/material";
import React from "react";

const UserImage = ({ alt, image, size="60px"}) => {
  return (
    <Box mr={"0.8rem"}>
      <Avatar
        sx={{ width: size, height: size }}
        alt={alt}
        src={image&&`https://socialserver-ql45.onrender.com/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
