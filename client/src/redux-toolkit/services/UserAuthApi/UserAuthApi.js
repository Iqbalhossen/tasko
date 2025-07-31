import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/user/`,
    credentials: "include",
  }),
  tagTypes: [
    "Register",
    "Login",
    "ForgotPassword",
    "TokenVerify",
    "ResetPassword",
  ],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "view",
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Register", results, error, id: "User" },
      ],
    }),
    LoginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Login", results, error, id: "User" },
      ],
    }),
    LogoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    ForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "ForgotPassword", results, error, id: "User" },
      ],
    }),

    ForgotPasswordTokenVerify: builder.query({
      query: (token) => ({
        url: `/forgot-password/token/verify?token=${token}`,
        method: "get",
      }),
      invalidatesTags: (results, error) => [
        { type: "TokenVerify", results, error, id: "User" },
      ],
    }),

    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "ResetPassword", results, error, id: "User" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useForgotPasswordTokenVerifyQuery,
  useResetPasswordMutation,
} = UserAuthApi;
