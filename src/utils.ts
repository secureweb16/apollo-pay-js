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
    return await fetch(params.url, request);
  } catch (error: any) {
    return error;
  }
};

// const processOptions = async () => {
//   //
// };

export { call };
