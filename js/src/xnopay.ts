import { RpcClient } from "./rpc-client";
import { AuthenticationOptions } from "./types";

// Export all types from types.ts
export * from "./types";

/**
 * Creates an RPC instance for interacting with a Nano node.
 * Offers simplified instantiation with optional customization.
 *
 * @param nodeUrl - The URL of the Nano node's RPC endpoint (e.g., 'http://localhost:7076').
 * @param auth - Optional authentication options.
 * @param retries - Optional number of retries for RPC calls.
 * @param logger - Optional logger object. Defaults to console if not provided.
 * @returns An RPC client instance.
 */
export const rpc = (
  nodeUrl: string,
  auth?: AuthenticationOptions,
  retries?: number,
  logger?: Console
): RpcClient => {
  return new RpcClient(nodeUrl, auth, retries, logger);
};

// Optionally export RpcClient if users might want to extend it or use it directly
export { RpcClient };
