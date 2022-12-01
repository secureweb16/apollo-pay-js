import {
  ApolloPayCredentials,
  ApolloPayOrderAttributes,
} from "./script-options";

export declare function validateCredentials(
  credentials: ApolloPayCredentials
): string;

export declare function processCheckout(
  params: ApolloPayOrderAttributes
): string;
