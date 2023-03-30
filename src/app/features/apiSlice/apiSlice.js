import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persistedReducer.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  })

export const socialAppApi = createApi({
    reducerPath: "socialApi",
    // baseQuery : fetchBaseQuery({baseUrl:" http://localhost:3500"}),
    baseQuery,
    tagTypes:[],
    endpoints:(builder)=>({
        authLogin: builder.mutation({
            query:(user)=>({
                url: "/auth/login",
                method: "POST",
                body: user
            })
        }),
        authRegister: builder.mutation({
            query: (user)=>({
                url:"/auth/register",
                method: "POST",
                body: user
            })
        }),
        createPost : builder.mutation({
            query:(post)=>({
                url:"/postupload",
                method:"POST",
                body: post
            })
        })
    })
})

export const {useAuthLoginMutation,useAuthRegisterMutation,useCreatePostMutation} = socialAppApi;