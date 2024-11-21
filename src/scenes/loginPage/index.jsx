import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box width="100%" textAlign="center">
      <Box
        bgcolor={theme.palette.background.alt}
        width={"100%"}
        textAlign={"center"}
      >
        <Typography
          sx={{ fontWeight: "bold", py: "1rem" }}
          fontSize="32px"
          color={"primary"}
        >
          Squawk
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        mx="auto"
        my={"2rem"}
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Squawk, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
