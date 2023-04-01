import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import ProfileTagForList from '../Components/ProfileTagForList';

const FriendList = ({friends}) => {
  const {palette}=useTheme();
  // const {friends} = useSelector(state=>state.persistedReducer.user); 
    return (
    <Box
    bgcolor={palette.background.alt}
    padding="1rem 1.5rem 0.75rem 1.5rem"
    borderRadius={"0.75rem"}
    >
        <Typography mb={"0.5rem"} variant='h5' fontWeight="500">
            Friend List
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
        {friends?friends.map((e)=>
        {
            return(
                <ProfileTagForList userId={e}/>
                )
        }):<Typography>Loading ...</Typography>}
        </Box>
    </Box>
  )
}

export default FriendList