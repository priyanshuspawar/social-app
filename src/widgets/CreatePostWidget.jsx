import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AttachmentsPanel from "../Components/AttachmentsPanel";
import PostDescriptionField from "../Components/PostDescriptionField";
import UserImage from "../Components/UserImage";

const CreatePostWidget = ({ firstName, picturePath }) => {
  const { palette } = useTheme();
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [uploaded, setuploaded] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 500px)");

  const isDescriptionNotEmpty = description != null;
  return (
    <Box
      bgcolor={palette.background.alt}
      display={"flex"}
      flexDirection={"column"}
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
      mb={"2rem"}
    >
      <Box display={"flex"} flexDirection={"row"} gap={"0.4rem"} mb={"0.8rem"}>
        <UserImage alt={firstName} size={!isNonMobileScreens?"50px":"60px"} image={picturePath} />
        <PostDescriptionField
          setDescription={setDescription}
          description={description}
        />
      </Box>
      <Divider />

      <AttachmentsPanel
        description={description}
        isDescriptionNotEmpty={isDescriptionNotEmpty}
        setPicture={setPicture}
        picture={picture}
        palette={palette}
        setDescription={setDescription}
        setuploaded={setuploaded}
      />
    </Box>
  );
};

export default CreatePostWidget;
