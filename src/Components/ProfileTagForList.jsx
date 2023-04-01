import { Box, Typography, useTheme, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useAddRemoveFriendMutation, useGetUserDetailsQuery } from "../app/features/apiSlice/apiSlice";
import { useSelector } from "react-redux";
const ProfileTagForList = ({
  userId: friendId,
}) => {
    const {isError,isLoading,isSuccess,data,error} = useGetUserDetailsQuery({id:friendId});
    
    const {picturePath, firstName, lastName, location} = isSuccess?data:{
    };
  const user = useSelector((state) => state.persistedReducer.user);
  const { _id, friends } = user;
  const { palette } = useTheme();
  const [addRemoveFriend] = useAddRemoveFriendMutation();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [isFriend, setIsFriend] = useState(true);
  useEffect(() => {
    if(friendId!=_id){
    setIsFriend(friends.includes(friendId));
    }
  }, [friends]);


  const addRemoveFriendHandler = async () => {
    const { data, error } = await addRemoveFriend({ id: _id, friendId });
    if (error) {
      console.log(error.message);
      setIsFriend(false);
    }
    if (data) {
      setIsFriend(true);
    }
  };

  return (
   
    <Box
      bgcolor={palette.background.alt}
      display={"flex"}
      alignItems={"center"}
    >
      {isSuccess?
      <>
      <UserImage size={"45px"} image={picturePath} />
      <Box flexGrow={1}>
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color={medium} fontSize="0.75rem">
          {location}
        </Typography>
      </Box>

      {!isFriend && (
        <IconButton
          disabled={isFriend}
          onClick={() => {
            addRemoveFriendHandler();
          }}
        >
          <PersonAddOutlined />
        </IconButton>
      )}
      </>:<Typography>Loading ...</Typography>}
    </Box>
  );
};

export default ProfileTagForList;
