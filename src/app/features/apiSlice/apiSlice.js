import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://socialserver-ql45.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().persistedReducer.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const socialAppApi = createApi({
  reducerPath: "socialApi",
  // baseQuery : fetchBaseQuery({baseUrl:" https://socialserver-ql45.onrender.com"}),
  baseQuery,
  tagTypes: ["UserDetailsUpdated","PostUpdated"],
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserDetailsUpdated","PostUpdated"],
    }),
    authRegister: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserDetailsUpdated","PostUpdated"],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/postupload",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["UserDetailsUpdated","PostUpdated"],
    }),
    getFeedPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags:["PostUpdated"],
      invalidatesTags:["UserDetailsUpdated"]
    }),
    addRemoveFriend: builder.mutation({
      query: ({ id, friendId }) => ({
        url: `/users/${id}/${friendId}`,
        method: "PATCH",
      }),
      invalidatesTags:["UserDetailsUpdated","PostUpdated"],
    }),
    getUserDetails :builder.query({
        query: ({id})=>({
            url:`/users/${id}`,
            method: "GET"
        }),
        providesTags:["UserDetailsUpdated"],
        invalidatesTags:["PostUpdated"]
    }),
    likePost : builder.mutation({
      query:({userId,postId})=>({
        url: `/posts/${postId}/${userId}`,
        method: "PATCH"
      }),
      invalidatesTags:["UserDetailsUpdated","PostUpdated"],
    }),
    getUserPost: builder.query({
      query:({userId})=>({
        url:`/posts/${userId}`,
        method: "GET"
      }),
      invalidatesTags:["UserDetailsUpdated","PostUpdated"],
    }),
    postComment: builder.mutation({
      query:({id,userId,comment})=>({
        url:`/posts/comment/${id}/${userId}`,
        method:"PATCH",
        body:{comment}
      }),
      invalidatesTags:["UserDetailsUpdated","PostUpdated"],
    })
    
  }),
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useCreatePostMutation,
  useGetFeedPostsQuery,
  useAddRemoveFriendMutation,
  useGetUserDetailsQuery,
  useLikePostMutation,
  useGetUserPostQuery,
  usePostCommentMutation
} = socialAppApi;
