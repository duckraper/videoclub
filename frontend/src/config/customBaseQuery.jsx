import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const baseUrl = "http://127.0.0.1:8000/api/";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const token = sessionStorage.getItem("access");

    if (token && endpoint !== "login") {
      headers.set("Authorization", `Bearer ${token}`);
      console.log(headers)
    }
    headers.set("Content-type", "application/json; charset=UTF-8");

    
    return headers;
    
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
     sessionStorage.removeItem("access");
     sessionStorage.removeItem("user")
     sessionStorage.removeItem("id")
    
    window.location
      .replace("http://127.0.0.1:5173 ")
      .then(() => window.location.reload());
  } else {
    return result;
  }
};

export default customFetchBase;
