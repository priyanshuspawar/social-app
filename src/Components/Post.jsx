import {
  Box,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import ProfileTag from "./ProfileTag";
import {
  ChatBubbleOutlineOutlined,
  ChatBubble,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useLikePostMutation, usePostCommentMutation } from "../app/features/apiSlice/apiSlice";
import { useSelector } from "react-redux";
import Comment from "./Comment";
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
  const [isCommentSectionHidden,setIsCommentSectionHidden] = useState(true);
  const [postComment]=usePostCommentMutation();

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
  const postCommentHandler = async () => {
    const response = await postComment({comment:commentFieldValue,id:_id,userId:LoggedUserId});
    if(response.data){
      setCommentFieldValue("");
    }
  }
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
          src={`https://socialserver-ql45.onrender.com/assets/${picturePath}`}
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
          <IconButton onClick={()=>{setIsCommentSectionHidden(!isCommentSectionHidden)}}>
           {isCommentSectionHidden? <ChatBubbleOutlineOutlined />:<ChatBubble/>}
          </IconButton>
        </Box>
        <ShareOutlined />
      </Box>

      {/* comment section */}
      {!isCommentSectionHidden&&
        <Box>
          {comments.map((comment,index)=><Box key={index}><Comment comments={comment}/></Box>)}
          <Divider sx={{my:"0.7rem"}}/>
        </Box>
      }


      {/* write comment */}

      <Box display={"flex"} sx={{boxShadow:"1"}} py={"0.2rem"} borderRadius={"4rem"} alignItems={"center"} px={"0.4rem"}>
        <UserImage image={loggedUserPicture} size="30px"/>
        <InputBase
          sx={{flexGrow:1}}
          placeholder="Add a comment"
          value={commentFieldValue}
          onChange={(event)=>{setCommentFieldValue(event.target.value)}}
          onFocus={() => {
            setCommentButtonShowing(true);
          }}
        />
        {isCommentButtonShowing&&<Typography color={palette.neutral.main} sx={{cursor:"pointer"}} fontSize={"0.7rem"} onClick={()=>{
          if(commentFieldValue.length>0){
            postCommentHandler();
          }
        }}>
          POST
        </Typography>}
      </Box>
    </Box>
  );
};

export default Post;
