import { rpc, AuthenticationOptions } from "./xnopay";

async function runExamples() {
  const nodeUrl = "http://localhost:7076"; // Replace with your Nano node URL

  // Example 1: No Authentication (Default)
  console.log("🟢 Example 1: No Authentication");
  const nanoRpcNoAuth = rpc(nodeUrl);
  await fetchNodeVersion(nanoRpcNoAuth);
  await fetchAccountBalance(nanoRpcNoAuth);

  // Example 2: Bearer Token Authentication
  console.log("\n🟢 Example 2: Bearer Token Authentication");
  const bearerAuth: AuthenticationOptions = {
    type: "bearer",
    token: "YOUR_BEARER_TOKEN",
  };
  const nanoRpcBearer = rpc(nodeUrl, bearerAuth);
  await fetchNodeVersion(nanoRpcBearer);

  // Example 3: API Key Authentication
  console.log("\n🟢 Example 3: API Key Authentication");
  const apiKeyAuth: AuthenticationOptions = {
    type: "apiKey",
    key: "YOUR_API_KEY",
  };
  const nanoRpcApiKey = rpc(nodeUrl, apiKeyAuth);
  await fetchNodeVersion(nanoRpcApiKey);

  // Example 4: Basic Authentication
  console.log("\n🟢 Example 4: Basic Authentication");
  const basicAuth: AuthenticationOptions = {
    type: "basic",
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
  };
  const nanoRpcBasic = rpc(nodeUrl, basicAuth);
  await fetchNodeVersion(nanoRpcBasic);
}

/**
 * Fetch and display the Nano node version.
 */
async function fetchNodeVersion(nanoRpcInstance: any) {
  try {
    const versionResponse = await nanoRpcInstance.version();
    console.log("✅ Node Version:", versionResponse);
  } catch (error: any) {
    console.error("❌ Error fetching Node Version:", error.message);
  }
}

/**
 * Fetch and display the balance of a specific Nano account.
 */
async function fetchAccountBalance(nanoRpcInstance: any) {
  const accountAddress =
    "nano_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpi00000000";

  try {
    const balanceResponse = await nanoRpcInstance.accountBalance(
      accountAddress
    );
    console.log("✅ Account Balance:", balanceResponse);
  } catch (error: any) {
    console.error("❌ Error fetching Account Balance:", error.message);
  }
}

// Run all examples
runExamples();
