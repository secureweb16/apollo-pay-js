import PolyPromise, { reject, resolve } from "promise-polyfill";

import {
  ApolloPayCredentials,
  ApolloPayOrderAttributes,
} from "../types/script-options";
import { call } from "./utils";
const SDKBaseURL = "http://35.183.204.94/api/";

async function validateCredentials(credentials: ApolloPayCredentials) {
  validateArguments(credentials);
  const url = `${SDKBaseURL}/store/validate/api-key`;

  return new PolyPromise(async (resolve, reject) => {
    try {
      const result = await call({
        url,
        method: "post",
        data: {
          apikey: credentials.api_key,
          merchantid: credentials.merchant_key,
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function processCheckout(params: ApolloPayOrderAttributes) {
  const url = `${SDKBaseURL}/checkout/hosted/apollopay`;

  return new PolyPromise(async (resolve, reject) => {
    try {
      const result = await call({
        url,
        method: "post",
        data: params,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function validateArguments(params: unknown) {
  if (typeof params !== "object" || params === null) {
    throw new Error("Expected an Object");
  }

  const validatedParams = Object.keys(params).filter(
    (v) => v === "merchant_key" || v === "api_key"
  );

  if (validatedParams.length !== 2) {
    throw new Error("Expected Parameters are `merchant_key` and `api_key`");
  }
}

// function getDefaultPromiseImplementation() {
//   if (typeof Promise === undefined) {
//     throw new Error(
//       "Promise is undefined. To resolve the issue, use a Promise ployfill."
//     );
//   }
//   return Promise;
// }

export { validateCredentials, processCheckout };
