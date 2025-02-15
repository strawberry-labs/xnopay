# xnopay

## Nano Cryptocurrency RPC Library

**xnopay** is a TypeScript/JavaScript package designed to simplify communication with Nano cryptocurrency nodes via RPC (Remote Procedure Call). It provides an intuitive and user-friendly abstraction layer, allowing developers to easily interact with a Nano node without needing to manually construct RPC requests.

### Features:

- **Simplified RPC Instance:** Instantiate the RPC client with a single function call: `xnopay.rpc()`.
- **Intuitive API:** Offers methods that directly correspond to Nano node RPC commands, making it easy to call node functionalities.
- **Authentication Flexibility:** Supports various authentication methods: No Authentication (default), Bearer Token, API Key, and Basic Authentication.
- **Handles Request Formatting:** Automatically formats RPC requests as JSON and manages headers.
- **Response Handling:** Parses JSON responses and handles RPC errors gracefully.
- **Built-in Error Handling and Retries:** Includes mechanisms for error management and automatic retries for robust communication.
- **Environment Agnostic:** Works seamlessly in both browser and Node.js environments.
- **Zero Dependencies on Nano Libraries:** Implemented natively without relying on external Nano-specific libraries.

### Installation:

```bash
npm install xnopay
```

### Usage:

#### Basic Usage (No Authentication):

```ts
import { rpc } from "xnopay";

async function main() {
  const nodeUrl = "http://localhost:7076"; // Replace with your Nano node URL
  const nanoRpc = rpc(nodeUrl);

  try {
    // Get account balance
    const balanceResponse = await nanoRpc.accountBalance(
      "nano_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpi00000000"
    );
    console.log("Account Balance:", balanceResponse);

    // Get node version
    const versionResponse = await nanoRpc.version();
    console.log("Node Version:", versionResponse);
  } catch (error: any) {
    console.error("RPC Error:", error.message);
  }
}

main();
```

#### Authentication Examples:

```ts
import { rpc, AuthenticationOptions } from "xnopay";

async function main() {
  const nodeUrl = "http://localhost:7076";
  const auth: AuthenticationOptions = {
    type: "bearer",
    token: "YOUR_BEARER_TOKEN", // Replace with your actual bearer token
  };
  const nanoRpc = rpc(nodeUrl, auth);

  try {
    const versionResponse = await nanoRpc.version();
    console.log("Version (Bearer Token Auth):", versionResponse);
  } catch (error: any) {
    console.error("RPC Error:", error.message);
  }
}

main();
```

```ts
import { rpc, AuthenticationOptions } from "xnopay";

async function main() {
  const nodeUrl = "http://localhost:7076";
  const auth: AuthenticationOptions = {
    type: "apiKey",
    key: "YOUR_API_KEY", // Replace with your actual API key
  };
  const nanoRpc = rpc(nodeUrl, auth);

  try {
    const versionResponse = await nanoRpc.version();
    console.log("Version (API Key Auth):", versionResponse);
  } catch (error: any) {
    console.error("RPC Error:", error.message);
  }
}

main();
```

```ts
import { rpc, AuthenticationOptions } from "xnopay";

async function main() {
  const nodeUrl = "http://localhost:7076";
  const auth: AuthenticationOptions = {
    type: "basic",
    username: "YOUR_USERNAME", // Replace with your username
    password: "YOUR_PASSWORD", // Replace with your password
  };
  const nanoRpc = rpc(nodeUrl, auth);

  try {
    const versionResponse = await nanoRpc.version();
    console.log("Version (Basic Auth):", versionResponse);
  } catch (error: any) {
    console.error("RPC Error:", error.message);
  }
}

main();
```

```ts
import { rpc, AuthenticationOptions } from "xnopay";

async function main() {
  const nodeUrl = "http://localhost:7076";
  const auth: AuthenticationOptions = {
    type: "basic",
    username: "YOUR_USERNAME", // Replace with your username
    password: "YOUR_PASSWORD", // Replace with your password
  };
  const nanoRpc = rpc(nodeUrl, auth);

  try {
    const versionResponse = await nanoRpc.version();
    console.log("Version (Basic Auth):", versionResponse);
  } catch (error: any) {
    console.error("RPC Error:", error.message);
  }
}

main();
```

### Authentication Options Configuration:

The rpc function accepts an optional auth parameter of type AuthenticationOptions. This object configures the authentication method for RPC requests.

```ts
interface AuthenticationOptions {
  type: "bearer" | "apiKey" | "basic" | "none";
  token?: string; // Required for Bearer Token
  key?: string; // Required for API Key
  username?: string; // Required for Basic Auth
  password?: string; // Required for Basic Auth
}
```

- **type: 'none' (Default):** No authentication headers are included in requests. This is the default if the auth parameter is not provided to the rpc function.
- **type: 'bearer':** Uses Bearer Token authentication. You must provide the token property. The token is sent in the Authorization: Bearer <token> header.
- **type: 'apiKey':** Uses API Key authentication. You must provide the key property. The API Key is sent in the x-api-key: <key> header.
- **type: 'basic':** Uses Basic Authentication. You must provide username and password properties. The credentials are Base64 encoded and sent in the Authorization: Basic <Base64(username:password)> header.

**Important:** Ensure the authentication method you choose is configured and enabled on your Nano node. Refer to your node's documentation for RPC authentication setup.

### API Overview:

The xnopay.rpc() function returns an RpcClient instance. This instance provides methods that directly mirror the Nano Node RPC API calls documented in the [Nano RPC Protocol Documentation](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdocs.nano.org%2Fcommands%2Frpc-protocol).

For example:

- rpcInstance.accountBalance(account: string, options?: object): Promise<AccountBalanceResponseRaw>
- rpcInstance.blockCount(includeCemented?: boolean): Promise<BlockCountResponseRaw>
- rpcInstance.version(): Promise<VersionResponseRaw>
- ... and so on for all other Node RPC methods.

Refer to the [Nano RPC Protocol Documentation](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdocs.nano.org%2Fcommands%2Frpc-protocol) for details on available methods, parameters, and response structures.

### Error Handling:

xnopay includes built-in error handling. If an RPC call fails (due to network issues, HTTP errors, or RPC-level errors from the Nano node), the library will:

1.  **Log the error** to the console (by default, you can provide a custom logger).
2.  **Retry the request** up to a default of 3 times (configurable via the retries parameter in rpc()).
3.  **Throw an Error** if all retries fail. The error message will contain details about the failure, including HTTP status codes or RPC error messages from the Nano node.

You should wrap your RPC calls in try...catch blocks to handle potential errors:

```ts
try {
  const balanceResponse = await nanoRpc.accountBalance(accountAddress);
  // ... process successful response ...
} catch (error: any) {
  console.error("Error fetching account balance:", error.message);
  // ... handle error ...
}
```
