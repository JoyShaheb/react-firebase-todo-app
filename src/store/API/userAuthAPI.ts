import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (signupParams) => ({
        url: "/register",
        method: "POST",
        body: signupParams,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (loginParams) => ({
        url: "/login",
        method: "POST",
        body: loginParams,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UpdateUser"],
    }),
    getUser: builder.query({
      query: ({ id }) => `/get-one-user/:${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = UserAuthAPI;
