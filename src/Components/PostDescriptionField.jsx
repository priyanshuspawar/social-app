import { Box, TextField, useTheme, InputBase } from "@mui/material";
import React from "react";

const PostDescriptionField = ({setDescription,description}) => {
  const neutralLight = useTheme().palette.neutral.light;
  return (
    <Box
      display={"flex"}
      px={"2rem"}
      flexGrow={1}
      borderRadius={"2rem"}
      bgcolor={neutralLight}
      alignItems={"center"}
    >
      <InputBase fullWidth placeholder={"what's in your mind... ?"} value={description} onChange={(event)=>{setDescription(event.target.value)}} />
    </Box>
  );
};

export default PostDescriptionField;
