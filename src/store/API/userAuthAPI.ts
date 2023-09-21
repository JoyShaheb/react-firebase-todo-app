import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth, googleProvider } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    emailSignup: builder.mutation<
      UserCredential,
      { email: string; password: string }
    >({
      queryFn: async (user: { email: string; password: string }) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          return {
            data: response, // Corrected the return type to match QueryReturnValue
          };
        } catch (err) {
          return {
            error: (err as Error)?.message, // Added type assertion to access message property
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

export const { useEmailSignupMutation, useGoogleSignupMutation } = UserAuthAPI;