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
    merchant_key: "YOUR_APOLLO_PAY_MERCHANT_KEY_HERE",
    api_key: "YOUR_APOLLO_PAY_API_KEY_HERE",
  });

  const validatedResponse = await AP.validateCredentials();
  if (validatedResponse.success === true) {
    //If Credentials Validated, Then Send Payment Request
    const product = {
      name: "Test AP Usage Package",
      sku: "SKU-TEST-123",
      price: 5.0,
      quantity: 2,
      total: 10.0,
    };
    const apollo_pay_products = [
      {
        product_name: product.name,
        product_price: product.price,
        product_sku: product.sku,
        quantity: product.quantity,
        total: product.total,
        tax: 0.0,
      },
    ];
    const checkoutResponse = await AP.processCheckout({
      ap_callback_url: "http://calbback/url",
      ap_order_sub_total: 10.0,
      ap_order_total: 15.0,
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
    if (checkoutResponse.button_rendered === true) {
      console.log("Button has rendered successfully");
    }
  } else {
    console.log("Make sure you have entered correct credentials");
  }
};

ApolloPay();
```

#### Callback Response

```js

The callback URL given in the process checkout request will receive following data in the POST request.

{
"ap_order_id":"YOUR_SYSTEM_ORDER_ID",
"ap_order_total":"10.00",
"ap_timestamp":"1671019334266",
"ap_transaction_id":"0x7933706b5f90b4d1497e10cdb041760678cf59c46d2bdb819b68937bb84ec5cb",
"ap_payment_status":"paid",
"ap_hash":"36b5f7d30d86809b3e28c8da3d127ddedca251b1122e9f7861433252b72ea51ab32df342ff6982a1419070b7611b41a44abf11f7d8c367907f7edcf50db1c0fb"
}

To validate the callback for order in your system and store in the Apollo Pay

const SDKBaseURL = "http://35.183.204.94/api";

const getOrderHMACHash = async () => {
  let calculated_hash;
  const url = `${SDKBaseURL}/checkout/generate/hmac`;
  const {ap_order_id, ap_timestamp, ap_order_total, ap_hash} = req.body;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      api_key: "YOUR_API_KEY_HERE",
      merchant_id: "YOUR_MERCHANT_ID_HERE",
      order_id: ap_order_id,
      timestamp: ap_timestamp,
      order_total: ap_order_total
    }
  });

  if(response.success === true) {
    calculated_hash = response.data.hmachash
  }

  if(calculated_hash === ap_hash) {
    console.log("You can mark your order paid in your system");
  }
}

```
