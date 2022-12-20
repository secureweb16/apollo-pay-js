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

const call = async <ApolloResponse>(params: ApolloArguments): Promise<ApolloResponse> => {
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
      method: params.method,
      headers: {
        "Content-Type": "application/json",
        ...params.headers,
      },
    };

    if (params.method.toLocaleLowerCase() === "post") {
      request["body"] = params.data;
    }
    const response = await fetch(params.url, request);
    return response.json();
  } catch (error: any) {
    return error;
  }
};

export { call };
