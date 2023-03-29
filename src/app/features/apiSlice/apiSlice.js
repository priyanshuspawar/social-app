import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialAppApi = createApi({
    reducerPath: "socialApi",
    baseQuery : fetchBaseQuery({baseUrl:"http://localhost:3500"}),
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
        })
    })
})

export const {useAuthLoginMutation,useAuthRegisterMutation} = socialAppApi;