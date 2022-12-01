import axios from "axios";

type ApolloRequest = {
  url: string;
  method: string;
  headers?: {};
  // data?: BodyInit | null | undefined;
  data?: {} | null | undefined;
};

type ApolloArguments = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data: {};
};

const call = async (params: ApolloArguments) => {
  try {
    const request: ApolloRequest = {
      url: params.url,
      method: params.method,
      // headers: {
      //   "Content-Type": "application/json",
      //   ...params.headers,
      // },
    };

    if (params.method.toLocaleLowerCase() === "post") {
      request["data"] = params.data;
    }

    return await axios(request);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { ...error.response?.data, error: error.message };
    } else if (typeof error === "object" && error !== null) {
      //An unepected error occurred
      return error;
    }
  }
};

export { call };
