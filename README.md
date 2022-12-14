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

  const validatedResponse = AP.validateCredentials();
  if (validatedResponse.success === true) {
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
    //If Credentials Validated, Then Send Payment Request
    const checkoutResponse = AP.processCheckout({
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
