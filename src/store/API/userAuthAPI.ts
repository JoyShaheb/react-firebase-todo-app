import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth, googleProvider } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

export interface IUserSignInData {
  email: string;
  password: string;
}

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    emailSignup: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailLogin: builder.mutation<UserCredential, IUserSignInData>({
      queryFn: async (user: IUserSignInData) => {
        try {
          const { email, password } = user;
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    googleSignup: builder.mutation<UserCredential, null>({
      queryFn: async () => {
        try {
          const response = await signInWithPopup(auth, googleProvider);
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useEmailSignupMutation,
  useGoogleSignupMutation,
  useEmailLoginMutation,
} = UserAuthAPI;
