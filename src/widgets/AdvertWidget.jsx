import { Box, useTheme, Typography } from "@mui/material";
import React from "react";
import { redirect } from "react-router-dom";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <Box
      bgcolor={palette.background.alt}
      padding="1rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
      mb={"2rem"}
      sx={{"&:hover":{cursor:"pointer"}}}
      onClick={()=>{
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </Box>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3500/assets/rareBeauty.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      <Box display={"flex"} justifyContent={"space-between"} mb={"0.2rem"}>
        <Typography color={main}>Rare Beauty</Typography>
        <Typography color={medium} fontSize={"0.6rem"}>rarebeauty.com</Typography> 
      </Box>

      <Typography color={medium} fontSize={"0.8rem"}>
        Being rare is all about being comfortable with yourself.
      </Typography>
    </Box>
  );
};

export default AdvertWidget;
