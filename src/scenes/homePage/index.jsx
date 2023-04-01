import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import CreatePostWidget from "../../widgets/CreatePostWidget";
import FeedPosts from "../../widgets/FeedPosts";
import UserWidget from "../../widgets/UserWidget";
import { useGetUserDetailsQuery } from "../../app/features/apiSlice/apiSlice";
import { setUserDetailsRefresh } from "../../app/features/data";
import FriendList from "../../widgets/FriendList";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  const user = useSelector(state=>state.persistedReducer.user);
  const { isError, isLoading, isSuccess, data, error,isFetching } = useGetUserDetailsQuery({id: user._id})
  const {firstName, picturePath} = user;

  useEffect(()=>{
    if (data&&isSuccess) {
      dispatch(setUserDetailsRefresh(data))
    }
  },[data])



  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* profile section */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>

          <UserWidget/>

        </Box>
        {/* Main section posts */}
        <Box
          display={"flex"}
          flexDirection="column"
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* creation post */}
          <CreatePostWidget alt={firstName} picturePath={picturePath}/>

          {/* feed */}
          <FeedPosts/>
        </Box>

        {/* friend list and ads */}
        {isNonMobileScreens && 
        (<Box flexBasis="26%">
          <FriendList/>
          
          
          </Box>)}
      </Box>
    </Box>
  );
};

export default HomePage;
