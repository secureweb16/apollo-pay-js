## Apollo Pay - Javascript

> Javascript / Typescript

## Why use apollo-pay-js?

- To integrate the Crypto Hosted Checkout Payment to the React JS/Typescript

## Usage

Import the `LoadScript` class asynchronously

### `LoadScript(options)`

- Accepts the parameters for API credentials
- Returns a Promise to Validate Credentials and Process Checkout

#### Async/Await

```js
import { LoadScript } from "@apollopay/apollo-pay-js";

const ApolloPay = async () => {
  const AP = new LoadScript({
    merchant_key: "Your Apollo Pay Merchant Key here",
    api_key: "Your Apollo Pay APi Key here",
  });

  const response = AP.validateCredentials();
  if (response.data.success === true) {
    //If Credentials Validated, Then Send Payment Request
    AP.processCheckout({
      ap_type: "NPMFE",
      ap_callback_url: "http://calbback/url",
      ap_order_sub_total: 5.0,
      ap_order_total: 10.0,
      ap_order_id: "YOUR_SYSTEM_ORDER_ID",
      ap_order_email: "test@gmail.com",
      ap_currency: "YOUR_CURRENCY_CODE_HERE",
      ap_currency_symbol: "YOUR_CURRENCY_SYMBOL_HERE",
      ap_shipping_total: 2.5,
      ap_tax_total: 2.5,
      ap_products: JSON.stringify(apollo_pay_products),
      logo: base64image, // Optional, Otherwise Load Default Button
      htmlselector: "ID_OF_DIV",
    });
  }
};

ApolloPay();
```
