import {
  ApolloPayCredentials,
  ApolloPayOrderAttributes,
} from "./script-options";

interface ApolloPayOptionsNamespace {
  success: boolean;
  message: string;
  data: string | {};
}

interface ApolloPayNamespace {
  success?: boolean;
  message?: string;
  data: ApolloPayOptionsNamespace;
  error?: string;
}

export declare class LoadScript {
  constructor(credentials: ApolloPayCredentials);
  public validateCredentials(): Promise<ApolloPayNamespace>;
  public processCheckout(
    params: ApolloPayOrderAttributes
  ): Promise<ApolloPayNamespace>;
}
