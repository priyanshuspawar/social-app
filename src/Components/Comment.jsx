import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useGetUserDetailsQuery } from '../app/features/apiSlice/apiSlice';
import UserImage from './UserImage';
import moment from "moment"
const Comment = ({
    comments
}) => {
    const {body,userId,createdAt}=comments;
    const {palette} = useTheme();
    const {error,isLoading,data,isSuccess}=useGetUserDetailsQuery({id:userId});
  return (
   <Box display={"flex"} alignItems={"center"} p={"0.2rem 0.6rem"}>
        <UserImage image={isSuccess?data.picturePath:false} size={"25px"}/>
        <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
        <Typography color={palette.neutral.main} fontSize={"0.6rem"}>{isSuccess?`${data.firstName}${data.lastName}`:""}</Typography>
        <Typography fontSize={"0.8rem"}>{body}</Typography>
        </Box>
        <Typography fontSize={"0.65rem"} color={palette.neutral.medium}>{moment(createdAt).fromNow()}</Typography>
   </Box>
  )
}

export default Comment