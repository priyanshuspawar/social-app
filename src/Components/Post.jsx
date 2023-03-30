import { Box, useTheme } from "@mui/material";
import React from "react";

const Post = ({
  _id,
  userId,
  firstName,
  lastName,
  location,
  description,
  picturePath,
  comments,
  createdAt,
  key,
}) => {
  const { palette } = useTheme();
  return (
    <Box
      bgcolor={palette.background.alt}
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
      key={key}
      display={"flex"}
    >
      {/* image */}
      <Box display={"flex"}>
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ objectFit:"contain",borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3500/assets/${picturePath}`}
        />
      </Box>
    </Box>
  );
};

export default Post;
