import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFeedPostsQuery } from "../app/features/apiSlice/apiSlice";
import { setPosts } from "../app/features/data";
import Post from "../Components/Post";
const FeedPosts = () => {
  const postData = useSelector((state) => state.persistedReducer.posts);
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess, data, error,isFetching } = useGetFeedPostsQuery();
  // const fri = friends;
  useEffect(() => {
    dispatch(setPosts(data));
  }, [isSuccess]);
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
      {isSuccess&&data.map(
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
            <Box key={_id}>
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
              // key={_id}
              userPicturePath={userPicturePath}
            />
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default FeedPosts;
