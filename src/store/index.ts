import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { systemSlice } from "./Slices/systemSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  UserAuthAPI,
  useEmailSignupMutation,
  useGoogleSignupMutation,
  useEmailLoginMutation,
} from "./API/userAuthAPI";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  systemSlice.reducer,
);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    [UserAuthAPI.reducerPath]: UserAuthAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export {
  // UserAuthAPI,
  useEmailSignupMutation,
  useGoogleSignupMutation,
  useEmailLoginMutation,
};
