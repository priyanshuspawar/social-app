import { Box, Divider, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AttachmentsPanel from "../Components/AttachmentsPanel";
import PostDescriptionField from "../Components/PostDescriptionField";
import UserImage from "../Components/UserImage";

const CreatePostWidget = ({ firstName, picturePath }) => {
  const { palette } = useTheme();
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState(null);
  const [uploaded, setuploaded] = useState(null);

  const isDescriptionNotEmpty = description != null;
  return (
    <Box
      bgcolor={palette.background.alt}
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
    >
      <Box display={"flex"} flexDirection={"row"} gap={"0.4rem"} mb={"0.8rem"}>
        <UserImage alt={firstName} image={picturePath} />
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
