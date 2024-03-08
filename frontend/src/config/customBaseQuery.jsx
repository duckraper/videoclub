import {client} from "./axios";

const customFetchBase = async ({ url, method, body, params }) => {
  try {
    const result = await client({ url, method, data: body, params });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError.response || { data: axiosError.message };
    return {
      error: {
        status: err.status,
        data: err.data,
      },
    };
  }
};

export default customFetchBase;
