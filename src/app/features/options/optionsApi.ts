import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "./api/" }),
  reducerPath: "optionsApi",
  endpoints: (build) => ({
    getOptions: build.query({
      query: () => ({ url: "options" }),
    }),
    saveOptions: build.mutation({
      query: (options) => ({ url: "options", method: "POST", body: options }),
    }),
  }),
});
