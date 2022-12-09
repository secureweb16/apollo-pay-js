import axios from "axios";

type ApolloRequest = {
  // url: string;
  method: string;
  headers?: {};
  // data?: BodyInit | null | undefined;
  // data?: {} | null | undefined;
};

type ApolloArguments = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data: BodyInit;
};

const call = async <response>(params: ApolloArguments): Promise<Response> => {
  try {
    // ApolloRequest = {
    //   url: params.url,
    //   method: params.method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...params.headers,
    //   },
    // };
    const request: RequestInit = {
      // url: params.url,
      method: params.method,
      headers: {
        "Content-Type": "application/json",
        ...params.headers,
      },
    };

    if (params.method.toLocaleLowerCase() === "post") {
      request["body"] = params.data;
    }

    // return await axios(request);
    return await fetch(params.url, request);
  } catch (error: any) {
    // if (axios.isAxiosError(error)) {
    //   return { ...error.response?.data, error: error.message };
    // } else
    // if (typeof error === "object" && error !== null) {
    //An unepected error occurred
    return error;
    // }
    // throw new error;
  }
};

const processOptions = async () => {
  //
};

export { call };
