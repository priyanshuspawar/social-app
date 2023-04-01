import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetUserPostQuery } from "../app/features/apiSlice/apiSlice";
import Post from "../Components/Post";
const UserPosts = ({ userId }) => {
  const { isError, isLoading, isSuccess, error, data } = useGetUserPostQuery({
    userId,
  });
  const { palette } = useTheme();
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
      {isSuccess ? (
        data.length > 0 ? (
          data.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              location,
              likes,
              description,
              picturePath,
              userPicturePath,
              comments,
              createdAt,
            }) => {
              return (
                <Post
                  _id={_id}
                  userId={userId}
                  firstName={firstName}
                  lastName={lastName}
                  location={location}
                  description={description}
                  picturePath={picturePath}
                  comments={comments}
                  createdAt={createdAt}
                  likes={likes}
                  key={_id}
                  userPicturePath={userPicturePath}
                />
              );
            }
          )
        ) : (
          <Box
            bgcolor={palette.background.alt}
            padding="3rem 1.5rem 3rem 1.5rem"
            borderRadius={"0.75rem"}
            textAlign={"center"}
          >
            <Typography variant="h5" fontWeight={"500"}>No Post yet</Typography>
          </Box>
        )
      ) : (
        <Typography> Loading ...</Typography>
      )}
    </Box>
  );
};

export default UserPosts;
