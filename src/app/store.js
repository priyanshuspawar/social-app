import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  PERSIST,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PURGE,
  FLUSH,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { socialAppApi } from "./features/apiSlice/apiSlice";
import authRedcer from "./features/data";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, authRedcer);

export const store = configureStore({
  reducer: {persistedReducer,[socialAppApi.reducerPath]:socialAppApi.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socialAppApi.middleware),
});

setupListeners(store.dispatch)