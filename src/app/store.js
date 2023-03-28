import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import authRedcer from "./features/data";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, authRedcer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
