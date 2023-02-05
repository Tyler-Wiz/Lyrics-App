import { songsApi } from "@/store/reducers/songsApi";
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./reducers/favoriteSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    [songsApi.reducerPath]: songsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(songsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
