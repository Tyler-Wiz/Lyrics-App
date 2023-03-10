import { BaseURL, serverURL } from "@/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const songsApi = createApi({
  reducerPath: "songsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverURL}`,
  }),
  endpoints: (builder) => ({
    getAllSongs: builder.query<any, void>({
      query: () => "songs",
    }),
  }),
});

export const { useGetAllSongsQuery } = songsApi;
