import {
  Box,
  Typography,
  useTheme,
  IconButton,
  InputBase,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import ProfileTag from "./ProfileTag";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useLikePostMutation } from "../app/features/apiSlice/apiSlice";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";
const Post = ({
  _id,
  // id of the user that owns this post
  userId,
  firstName,
  lastName,
  location,
  description,
  picturePath,
  comments,
  createdAt,
  userPicturePath,
  likes,
  key,
}) => {
  const { palette } = useTheme();
  const { _id: LoggedUserId,picturePath:loggedUserPicture } = useSelector(
    (state) => state.persistedReducer.user
  );
  const [likePost] = useLikePostMutation();
  const [commentFieldValue,setCommentFieldValue] = useState("");
  const [isCommentButtonShowing,setCommentButtonShowing] =useState(false);
  const numOfLikes = likes == undefined ? "" : `${Object.keys(likes).length}`;
  const [isPostLiked, setIsPostLiked] = useState(false);

  useEffect(() => {
    if (likes) {
      setIsPostLiked(Object.keys(likes).includes(LoggedUserId));
    }
  }, []); //eslint-disable-line--deps

  const likeButtonHandler = async () => {
    const response = await likePost({ userId: LoggedUserId, postId: _id });
    if (response.data) {
      setIsPostLiked(!isPostLiked);
    }
  };
  return (
    <Box
      bgcolor={palette.background.alt}
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      borderRadius={"0.75rem"}
      key={key}
      display={"flex"}
      flexDirection={"column"}
    >
      <ProfileTag
        userPicturePath={userPicturePath}
        userId={userId}
        location={location}
        firstName={firstName}
        lastName={lastName}
      />

      <Typography color={palette.neutral.main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* image */}
      <Box display={"flex"}>
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3500/assets/${picturePath}`}
        />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pt={"1rem"}
      >
        <Box display={"flex"} gap={"0.8rem"}>
          <Box display={"flex"} alignItems={"center"}>
            <IconButton onClick={likeButtonHandler}>
              {isPostLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{numOfLikes}</Typography>
          </Box>
          <IconButton>
            <ChatBubbleOutlineOutlined />
          </IconButton>
        </Box>
        <ShareOutlined />
      </Box>

      {/* write comment */}

      <Box display={"flex"} sx={{boxShadow:"1"}} py={"0.2rem"} borderRadius={"4rem"} alignItems={"center"} px={"0.4rem"}>
        <UserImage image={loggedUserPicture} size="25px"/>
        <InputBase
          sx={{flexGrow:1}}
          placeholder="Add a comment"
          value={commentFieldValue}
          onChange={(event)=>{setCommentFieldValue(event.target.value)}}
          onFocus={() => {
            setCommentButtonShowing(true);
          }}
        />
        {isCommentButtonShowing&&<Typography color={palette.neutral.main} fontSize={"0.7rem"}>
          POST
        </Typography>}
      </Box>
    </Box>
  );
};

export default Post;
