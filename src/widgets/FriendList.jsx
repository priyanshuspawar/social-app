import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import ProfileTagForList from '../Components/ProfileTagForList';

const FriendList = ({friends,title="Friend List"}) => {
  const {palette}=useTheme();
  // const {friends} = useSelector(state=>state.persistedReducer.user); 
    return (
    <Box
    bgcolor={palette.background.alt}
    padding="1rem 1.5rem 0.75rem 1.5rem"
    borderRadius={"0.75rem"}
    mb={"2rem"}
    >
        <Typography mb={"0.5rem"} variant='h5' fontWeight="500">
            {title}
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
        {friends?friends.length==0&&<Typography>No Friends yet</Typography>:<></>}
        {friends?friends.map((e,i)=>
        {
            return(
                <Box key={i}>
                <ProfileTagForList userId={e}/>
                </Box>
                )
        }):<Typography>Loading ...</Typography>}
        </Box>
    </Box>
  )
}

export default FriendList