import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[]
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode==="light"?"dark":"light";
        },
        setLogin:(state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setUserDetailsRefresh:(state,action)=>{
            state.user=action.payload;
        },
        setLogout:(state)=>{
            state.token=null;
            state.user = null;
        },
        setFriends:(state,action)=>{
            state.user.friends= action.payload.user.friends;
        },
        setPosts:(state,action)=>{
            state.posts= action.payload
        }
    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setUserDetailsRefresh} = authSlice.actions;
export default authSlice.reducer;