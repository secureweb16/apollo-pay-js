import {
  ApolloPayCredentials,
  ApolloPayOrderAttributes,
} from "../types/script-options";
import { call } from "./utils";
import moment from "moment";

import hmacSHA512 from "crypto-js/hmac-sha512";
import Hex from "crypto-js/enc-hex";

const SDKBaseURL = "http://35.183.204.94/api";

export class LoadScript {
  constructor(protected credentials: ApolloPayCredentials) {}
  async validateCredentials(
    PromisePonyfill: PromiseConstructor = this.getDefaultPromiseImplementation()
  ) {
    if (typeof document === "undefined") return PromisePonyfill.resolve(null);
    this.validateArguments(this.credentials);
    const url = `${SDKBaseURL}/store/validate/api-key`;

    return new PromisePonyfill(async (resolve, reject) => {
      try {
        const result = await call({
          url,
          method: "post",
          data: JSON.stringify({
            apikey: this.credentials.api_key,
            merchantid: this.credentials.merchant_key,
          }),
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  async processCheckout(
    params: ApolloPayOrderAttributes,
    PromisePonyfill: PromiseConstructor = this.getDefaultPromiseImplementation()
  ) {
    if (typeof document === "undefined") return PromisePonyfill.resolve(null);
    const post_url = `${SDKBaseURL}/checkout/hosted/apollopay`;

    return new PromisePonyfill(async (resolve, reject) => {
      try {
        const timestamp = moment().format();

        const ap_hash = this.generateHMAC(
          params.ap_order_id,
          params.ap_order_total,
          timestamp
        );

        const ap_shipping_total = 0;
        const ap_tax_total = 0;
        //Create Form
        const formElement = document.createElement("form");
        formElement.setAttribute("method", "post");
        formElement.setAttribute("action", post_url);
        //Create Fields
        //ap_type
        const apType = document.createElement("input");
        apType.setAttribute("type", "hidden");
        apType.setAttribute("name", "ap_type");
        apType.setAttribute("value", "NPMFE");
        //ap_callback_url
        const apCallbackURL = document.createElement("input");
        apCallbackURL.setAttribute("type", "hidden");
        apCallbackURL.setAttribute("name", "ap_callback_url");
        apCallbackURL.setAttribute("value", "http://example.com/callback");
        //ap_order_sub_total
        const apOrderSubTotal = document.createElement("input");
        apOrderSubTotal.setAttribute("type", "hidden");
        apOrderSubTotal.setAttribute("name", "ap_order_sub_total");
        apOrderSubTotal.setAttribute("value", `${params.ap_order_sub_total}`);
        //ap_order_total
        const apOrderTotal = document.createElement("input");
        apOrderTotal.setAttribute("type", "hidden");
        apOrderTotal.setAttribute("name", "ap_order_total");
        apOrderTotal.setAttribute("value", `${params.ap_order_total}`);
        //ap_timestamp
        const apTimestamp = document.createElement("input");
        apTimestamp.setAttribute("type", "hidden");
        apTimestamp.setAttribute("name", "ap_timestamp");
        apTimestamp.setAttribute("value", `${timestamp}`);
        //ap_order_id
        const apOrderID = document.createElement("input");
        apOrderID.setAttribute("type", "hidden");
        apOrderID.setAttribute("name", "ap_order_id");
        apOrderID.setAttribute("value", `${params.ap_order_id}`);
        //ap_mct
        const apMCT = document.createElement("input");
        apMCT.setAttribute("type", "hidden");
        apMCT.setAttribute("name", "ap_mct");
        apMCT.setAttribute("value", `${this.credentials.merchant_key}`);
        //ap_hash
        const apHash = document.createElement("input");
        apHash.setAttribute("type", "hidden");
        apHash.setAttribute("name", "ap_hash");
        apHash.setAttribute("value", `${ap_hash}`);
        //ap_order_email
        const apOrderEmail = document.createElement("input");
        apOrderEmail.setAttribute("type", "hidden");
        apOrderEmail.setAttribute("name", "ap_order_email");
        apOrderEmail.setAttribute("value", `${params.ap_order_email}`);
        //ap_currency
        const apCurrency = document.createElement("input");
        apCurrency.setAttribute("type", "hidden");
        apCurrency.setAttribute("name", "ap_currency");
        apCurrency.setAttribute("value", `${params.ap_currency}`);
        //ap_currency_symbol
        const apCurrencySymbol = document.createElement("input");
        apCurrencySymbol.setAttribute("type", "hidden");
        apCurrencySymbol.setAttribute("name", "ap_currency_symbol");
        apCurrencySymbol.setAttribute("value", `${params.ap_currency_symbol}`);
        //ap_shipping_total
        const apShippingTotal = document.createElement("input");
        apShippingTotal.setAttribute("type", "hidden");
        apShippingTotal.setAttribute("name", "ap_shipping_total");
        apShippingTotal.setAttribute("value", `${ap_shipping_total}`);
        //ap_tax_total
        const apTaxTotal = document.createElement("input");
        apTaxTotal.setAttribute("type", "hidden");
        apTaxTotal.setAttribute("name", "ap_tax_total");
        apTaxTotal.setAttribute("value", `${ap_tax_total}`);
        //ap_products
        const apProducts = document.createElement("input");
        apProducts.setAttribute("type", "hidden");
        apProducts.setAttribute("name", "ap_products");
        apProducts.setAttribute("value", `${params.ap_products}`);
        //submit
        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        if (params.logo) {
          const ApolloLogo = document.createElement("img");
          ApolloLogo.setAttribute("src", `${params.logo}`);
          ApolloLogo.setAttribute("alt", "Pay With Apollo Pay");
          ApolloLogo.setAttribute("style", `max-width: 130px;`);
          submitButton.setAttribute(
            "style",
            `background: white;
          border: 1px solid #009de4;
          border-radius: 5px;
          display: flex;
          padding: 10px 20px;
          margin: 0px auto;
          align-items: center;
          text-transform: capitalize;
          font-size: 16px;
          flex-direction: column;
          cursor: pointer;`
          );
          submitButton.append(ApolloLogo);
        } else {
          const ApolloText = document.createElement("span");
          ApolloText.innerHTML = "Pay With Apollo Pay";
          submitButton.setAttribute(
            "style",
            `border: none;
          background: linear-gradient(90deg,#019de4,#00b9f6);
          color: white;
          padding: 10px 20px 10px;
          font-size: 15px;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;`
          );
          submitButton.append(ApolloText);
        }

        formElement.append(apType);
        formElement.append(apCallbackURL);
        formElement.append(apOrderSubTotal);
        formElement.append(apOrderTotal);
        formElement.append(apTimestamp);
        formElement.append(apOrderID);
        formElement.append(apMCT);
        formElement.append(apHash);
        formElement.append(apOrderEmail);
        formElement.append(apCurrency);
        formElement.append(apCurrencySymbol);
        formElement.append(apShippingTotal);
        formElement.append(apTaxTotal);
        formElement.append(apProducts);
        formElement.append(submitButton);

        this.insertHTML(params.htmlselector, formElement);
        resolve({ button_rendered: true });
      } catch (error) {
        reject(error);
      }
    });
  }

  insertHTML(selector: string, html: Element) {
    const qselector = document.querySelector(`#${selector}`);
    if (qselector !== null) qselector.innerHTML = "";
    qselector?.insertAdjacentElement("beforeend", html);
  }

  validateArguments(params: unknown) {
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
  generateHMAC(
    remote_order_id: number,
    remote_order_total: number,
    timestamp: string
  ) {
    const string = `${this.credentials.merchant_key}^${remote_order_id}^${timestamp}^${remote_order_total}`;
    // const hmac = crypto.createHmac("sha512", this.credentials.api_key);
    // hmac.update(string);
    // return hmac.digest("hex");
    const hassha512 = hmacSHA512(string, this.credentials.api_key);
    return Hex.stringify(hassha512);
  }

  getDefaultPromiseImplementation() {
    if (typeof Promise === undefined) {
      throw new Error(
        "Promise is undefined. To resolve the issue, use a Promise ployfill."
      );
    }
    return Promise;
  }
}
