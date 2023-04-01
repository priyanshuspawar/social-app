import React from 'react'
import Navbar from '../../Components/Navbar'
import { Box, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import UserWidget from '../../widgets/UserWidget'
import { useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../../app/features/apiSlice/apiSlice'
import UserPosts from '../../widgets/UserPosts'
import AdvertWidget from '../../widgets/AdvertWidget'
import FriendList from '../../widgets/FriendList'


const ProfilePage = () => {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { isError, isLoading, isSuccess, data, error,isFetching } = useGetUserDetailsQuery({id: userId})
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Navbar />
      {isSuccess&&
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* profile section */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>

          <UserWidget data={data}/>

        </Box>
        {/* post section of the user */}
        <Box
          display={"flex"}
          flexDirection="column"
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {!isNonMobileScreens && <FriendList friends={data.friends}/>}
          <UserPosts userId={userId}/>
        </Box>

        {/* advert and friend list section */}
        {isNonMobileScreens && 
        (<Box flexBasis="26%">
          <AdvertWidget/>
          <FriendList friends={data.friends}/>
          </Box>)}

      </Box>}
    </Box>
  )
}

export default ProfilePage