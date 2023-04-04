import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  BorderAllRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useCreatePostMutation } from "../app/features/apiSlice/apiSlice";
import { useSelector } from "react-redux";
const AttachmentsPanel = ({
  palette,
  isDescriptionNotEmpty,
  description,
  setDescription,
  setUploaded,
}) => {
  const [createPost] = useCreatePostMutation();
  const { _id, firstName, lastName, location, picturePath } = useSelector(
    (state) => state.persistedReducer.user
  );
  const isNonMobileScreens = useMediaQuery("(min-width: 500px)");
  const user = {
    userId: _id,
    firstName,
    lastName,
    location,
  };
  const [fieldValue, setFieldValue] = useState({ picture: null });
  const [isImageRequied, setImageRequired] = useState(false);

  const isButtonDisabled = isDescriptionNotEmpty && fieldValue.picture;

  const postButtonHandler = async () => {
    const newPostData = new FormData();
    for (let i in user) {
      newPostData.append(i, user[i]);
    }
    newPostData.append("userPicturePath", picturePath);
    newPostData.append("description", description);
    newPostData.append("picture", fieldValue.picture);
    newPostData.append("picturePath", fieldValue.picture.name);

    // for (const value of newPostData.values()) {
    //   console.log(value);
    // }
    const response = await createPost(newPostData);
    if (response.error) {
      setDescription(response.error.message);
    }
    if (response.data) {
      setDescription(null);
      setFieldValue({ picture: null });
      setImageRequired(false);
      // setUploaded(true);
    }
  };

  return (
    <Box>
      {/* dropzone */}
      {isImageRequied && (
        <Box
          border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          padding={"0.5rem"}
          textAlign="center"
          mt={"0.5rem"}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setFieldValue({ picture: acceptedFiles[0] })
            }
          >
            {({ getInputProps, getRootProps }) => {
              return (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!fieldValue.picture ? (
                    <p>Add a picture</p>
                  ) : (
                    <Box
                      alignItems={"center"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Typography>{fieldValue.picture.name}</Typography>
                      <EditOutlined />
                    </Box>
                  )}
                </Box>
              );
            }}
          </Dropzone>
        </Box>
      )}
      {/* upload options and post button */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"1rem"}
      >
        <Box
          gap={"1px"}
          display={"flex"}
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setFieldValue({ picture: null });
            setImageRequired(!isImageRequied);
          }}
        >
          {isImageRequied ? (
            <DeleteOutlined sx={{ color: "red" }} />
          ) : (
            <ImageOutlined sx={{ color: `${palette.neutral.main}` }} />
          )}
          {isNonMobileScreens && (
            <Typography color={isImageRequied ? "red" : undefined}>
              {isImageRequied ? "Remove" : "Image"}
            </Typography>
          )}
        </Box>
        <Box gap={"1px"} sx={{ display: "flex" }}>
          <GifBoxOutlined sx={{ color: `${palette.neutral.main}` }} />
          {isNonMobileScreens && <Typography>Clip</Typography>}
        </Box>
        <Box gap={"1px"} sx={{ display: "flex" }}>
          <AttachFileOutlined sx={{ color: `${palette.neutral.main}` }} />
          {isNonMobileScreens && <Typography>Attachment</Typography>}
        </Box>
        <Box gap={"1px"} display={"flex"} sx={{ display: "flex" }}>
          <MicOutlined sx={{ color: `${palette.neutral.main}` }} />
          {isNonMobileScreens && <Typography>Audio</Typography>}
        </Box>
        <Button
          disabled={!isButtonDisabled}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
          onClick={postButtonHandler}
        >
          POST
        </Button>
      </Box>
    </Box>
  );
};

export default AttachmentsPanel;
