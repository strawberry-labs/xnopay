import {
  AuthenticationOptions,
  RpcRequest,
  RpcResponse,
  AccountBalanceResponse,
  AccountBlockCountResponse,
  AccountGetResponse,
  AccountHistoryOptions,
  AccountHistoryResponse,
  AccountInfoOptions,
  AccountInfoResponse,
  AccountKeyResponse,
  AccountRepresentativeResponse,
  AccountWeightResponse,
  AccountsBalancesResponse,
  AccountsFrontiersResponse,
  AccountsPendingOptions,
  AccountsPendingResponse,
  AccountsReceivableOptions,
  AccountsReceivableResponse,
  AccountsRepresentativesResponse,
  AvailableSupplyResponse,
  BlockAccountResponse,
  BlockConfirmResponse,
  BlockCountResponse,
  BlockCreateParams,
  BlockCreateResponse,
  BlockHashResponse,
  BlockInfoOptions,
  BlockInfoResponse,
  BlocksInfoOptions,
  BlocksInfoResponse,
  BlocksOptions,
  BlocksResponse,
  BootstrapAnyResponse,
  BootstrapLazyResponse,
  BootstrapResponse,
  BootstrapStatusResponse,
  ChainOptions,
  ChainResponse,
  ConfirmationActiveResponse,
  ConfirmationHistoryOptions,
  ConfirmationHistoryResponse,
  ConfirmationHeightCurrentlyProcessingResponse,
  ConfirmationInfoOptions,
  ConfirmationInfoResponse,
  ConfirmationQuorumResponse,
  DelegatorsCountResponse,
  DelegatorsResponse,
  DeterministicKeyResponse,
  EpochUpgradeResponse,
  FrontierCountResponse,
  FrontiersResponse,
  KeepaliveResponse,
  KeyCreateResponse,
  KeyExpandResponse,
  LedgerOptions,
  LedgerResponse,
  NodeIdDeleteResponse,
  NodeIdResponse,
  PeersResponse,
  PendingExistsOptions,
  PendingExistsResponse,
  PendingResponse,
  PopulateBacklogResponse,
  ProcessOptions,
  ProcessResponse,
  ReceivableExistsOptions,
  ReceivableExistsResponse,
  ReceivableOptions,
  ReceivableResponse,
  RepresentativesOnlineResponse,
  RepresentativesResponse,
  RepublishOptions,
  RepublishResponse,
  SignParams,
  SignResponse,
  StatsClearResponse,
  StatsResponse,
  StopResponse,
  SuccessorsResponse,
  TelemetryOptions,
  TelemetryResponse,
  UncheckedClearResponse,
  UncheckedGetOptions,
  UncheckedGetResponse,
  UncheckedKeysOptions,
  UncheckedKeysResponse,
  UncheckedOptions,
  UncheckedResponse,
  UnopenedResponse,
  UptimeResponse,
  ValidateAccountNumberResponse,
  VersionResponse,
  WorkCancelResponse,
  WorkGenerateOptions,
  WorkGenerateResponse,
  WorkPeerAddResponse,
  WorkPeersClearResponse,
  WorkPeersResponse,
  WorkValidateOptions,
  WorkValidateResponse,
} from "./types";

/**
 * RPC Client for interacting with a Nano node.
 */
export class RpcClient {
  private nodeUrl: string;
  private auth?: AuthenticationOptions;
  private retries: number;
  private logger: Console;

  /**
   * Constructor for the RpcClient.
   *
   * @param nodeUrl - The URL of the Nano node's RPC endpoint.
   * @param auth - Optional authentication options.
   * @param retries - Optional number of retries for RPC calls.
   * @param logger - Optional logger object. Defaults to console if not provided.
   */
  constructor(
    nodeUrl: string,
    auth?: AuthenticationOptions,
    retries: number = 3,
    logger: Console = console
  ) {
    this.nodeUrl = nodeUrl;
    this.auth = auth;
    this.retries = retries;
    this.logger = logger;
  }

  /**
   * Sends a raw RPC request to the Nano node.
   *
   * @param action - The RPC action to perform.
   * @param params - Optional parameters for the RPC action.
   * @returns A promise that resolves to the RPC response data.
   * @throws Error if the RPC call fails after retries.
   */
  private async call<T extends RpcResponse>(
    action: string,
    params?: Record<string, any>
  ): Promise<T> {
    const payload: RpcRequest = { action, ...params };
    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (this.auth) {
      if (this.auth.type === "bearer") {
        headers["Authorization"] = `Bearer ${this.auth.token ?? ""}`;
      } else if (this.auth.type === "apiKey") {
        headers["x-api-key"] = this.auth.key ?? "";
      } else if (this.auth.type === "basic") {
        const encodedAuth = btoa(
          `${this.auth.username ?? ""}:${this.auth.password ?? ""}`
        );
        headers["Authorization"] = `Basic ${encodedAuth}`;
      }
    }

    let attempts = 0;
    while (attempts <= this.retries) {
      attempts++;
      try {
        const response = await fetch(this.nodeUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, body: ${errorText}`
          );
        }

        const data: RpcResponse = await response.json();

        if (data.error) {
          throw new Error(`RPC error: ${data.error}`);
        }

        return data as T; // Type assertion here. We expect the correct type based on the method called.
      } catch (error: any) {
        this.logger.error(
          `RPC call '${action}' attempt ${attempts} failed: ${error.message}`
        );
        if (attempts > this.retries) {
          throw new Error(
            `RPC call '${action}' failed after ${this.retries} retries: ${error.message}`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
      }
    }
    throw new Error(
      `Unexpected error: Retries exhausted without success for action: ${action}`
    ); // Should not reach here in normal cases
  }

  // --- Node RPCs ---
  // ... (rest of the RPC methods are the same as before)
  async accountBalance(
    account: string,
    options?: { includeOnlyConfirmed?: boolean }
  ): Promise<AccountBalanceResponse> {
    return this.call<AccountBalanceResponse>("account_balance", {
      account,
      ...options,
    });
  }

  async accountBlockCount(account: string): Promise<AccountBlockCountResponse> {
    return this.call<AccountBlockCountResponse>("account_block_count", {
      account,
    });
  }

  async accountGet(key: string): Promise<AccountGetResponse> {
    return this.call<AccountGetResponse>("account_get", { key });
  }

  async accountHistory(
    account: string,
    count: number,
    options?: AccountHistoryOptions
  ): Promise<AccountHistoryResponse> {
    return this.call<AccountHistoryResponse>("account_history", {
      account,
      count: String(count),
      ...options,
    });
  }

  async accountInfo(
    account: string,
    options?: AccountInfoOptions
  ): Promise<AccountInfoResponse> {
    return this.call<AccountInfoResponse>("account_info", {
      account,
      ...options,
    });
  }

  async accountKey(account: string): Promise<AccountKeyResponse> {
    return this.call<AccountKeyResponse>("account_key", { account });
  }

  async accountRepresentative(
    account: string
  ): Promise<AccountRepresentativeResponse> {
    return this.call<AccountRepresentativeResponse>("account_representative", {
      account,
    });
  }

  async accountWeight(account: string): Promise<AccountWeightResponse> {
    return this.call<AccountWeightResponse>("account_weight", { account });
  }

  async accountsBalances(
    accounts: string[],
    options?: { includeOnlyConfirmed?: boolean }
  ): Promise<AccountsBalancesResponse> {
    return this.call<AccountsBalancesResponse>("accounts_balances", {
      accounts,
      ...options,
    });
  }

  async accountsFrontiers(
    accounts: string[]
  ): Promise<AccountsFrontiersResponse> {
    return this.call<AccountsFrontiersResponse>("accounts_frontiers", {
      accounts,
    });
  }

  async accountsReceivable(
    accounts: string[],
    count: number,
    options?: AccountsReceivableOptions
  ): Promise<AccountsReceivableResponse> {
    return this.call<AccountsReceivableResponse>("accounts_receivable", {
      accounts,
      count: String(count),
      ...options,
    });
  }

  async accountsPending(
    accounts: string[],
    count: number,
    options?: AccountsPendingOptions
  ): Promise<AccountsPendingResponse> {
    return this.call<AccountsPendingResponse>("accounts_pending", {
      accounts,
      count: String(count),
      ...options,
    });
  }

  async accountsRepresentatives(
    accounts: string[]
  ): Promise<AccountsRepresentativesResponse> {
    return this.call<AccountsRepresentativesResponse>(
      "accounts_representatives",
      { accounts }
    );
  }

  async availableSupply(): Promise<AvailableSupplyResponse> {
    return this.call<AvailableSupplyResponse>("available_supply");
  }

  async blockAccount(hash: string): Promise<BlockAccountResponse> {
    return this.call<BlockAccountResponse>("block_account", { hash });
  }

  async blockConfirm(hash: string): Promise<BlockConfirmResponse> {
    return this.call<BlockConfirmResponse>("block_confirm", { hash });
  }

  async blockCount(includeCemented?: boolean): Promise<BlockCountResponse> {
    return this.call<BlockCountResponse>("block_count", {
      include_cemented: includeCemented,
    });
  }

  async blockCreate(params: BlockCreateParams): Promise<BlockCreateResponse> {
    return this.call<BlockCreateResponse>("block_create", params);
  }

  async blockHash(block: any, jsonBlock?: boolean): Promise<BlockHashResponse> {
    return this.call<BlockHashResponse>("block_hash", {
      block,
      json_block: jsonBlock,
    });
  }

  async blockInfo(
    hash: string,
    options?: BlockInfoOptions
  ): Promise<BlockInfoResponse> {
    return this.call<BlockInfoResponse>("block_info", { hash, ...options });
  }

  async blocks(
    hashes: string[],
    options?: BlocksOptions
  ): Promise<BlocksResponse> {
    return this.call<BlocksResponse>("blocks", { hashes, ...options });
  }

  async blocksInfo(
    hashes: string[],
    options?: BlocksInfoOptions
  ): Promise<BlocksInfoResponse> {
    return this.call<BlocksInfoResponse>("blocks_info", {
      hashes,
      ...options,
    });
  }

  async bootstrap(
    address: string,
    port: number,
    bypassFrontierConfirmation?: boolean,
    id?: string
  ): Promise<BootstrapResponse> {
    return this.call<BootstrapResponse>("bootstrap", {
      address,
      port: String(port),
      bypass_frontier_confirmation: bypassFrontierConfirmation,
      id,
    });
  }

  async bootstrapAny(
    force?: boolean,
    id?: string,
    account?: string
  ): Promise<BootstrapAnyResponse> {
    return this.call<BootstrapAnyResponse>("bootstrap_any", {
      force,
      id,
      account,
    });
  }

  async bootstrapLazy(
    hash: string,
    force?: boolean,
    id?: string
  ): Promise<BootstrapLazyResponse> {
    return this.call<BootstrapLazyResponse>("bootstrap_lazy", {
      hash,
      force,
      id,
    });
  }

  async bootstrapStatus(): Promise<BootstrapStatusResponse> {
    return this.call<BootstrapStatusResponse>("bootstrap_status");
  }

  async chain(
    block: string,
    count: number,
    options?: ChainOptions
  ): Promise<ChainResponse> {
    return this.call<ChainResponse>("chain", {
      block,
      count: String(count),
      ...options,
    });
  }

  async confirmationActive(
    announcements?: number
  ): Promise<ConfirmationActiveResponse> {
    return this.call<ConfirmationActiveResponse>("confirmation_active", {
      announcements,
    });
  }

  async confirmationHeightCurrentlyProcessing(): Promise<ConfirmationHeightCurrentlyProcessingResponse> {
    return this.call<ConfirmationHeightCurrentlyProcessingResponse>(
      "confirmation_height_currently_processing"
    );
  }

  async confirmationHistory(
    hash?: string,
    options?: ConfirmationHistoryOptions
  ): Promise<ConfirmationHistoryResponse> {
    return this.call<ConfirmationHistoryResponse>("confirmation_history", {
      hash,
      ...options,
    });
  }

  async confirmationInfo(
    root: string,
    options?: ConfirmationInfoOptions
  ): Promise<ConfirmationInfoResponse> {
    return this.call<ConfirmationInfoResponse>("confirmation_info", {
      root,
      ...options,
    });
  }

  async confirmationQuorum(
    peerDetails?: boolean
  ): Promise<ConfirmationQuorumResponse> {
    return this.call<ConfirmationQuorumResponse>("confirmation_quorum", {
      peer_details: peerDetails,
    });
  }

  async delegators(
    account: string,
    threshold?: string,
    count?: number,
    start?: string
  ): Promise<DelegatorsResponse> {
    const params: any = { account };
    if (threshold) params.threshold = threshold;
    if (count) params.count = String(count);
    if (start) params.start = start;
    return this.call<DelegatorsResponse>("delegators", params);
  }

  async delegatorsCount(account: string): Promise<DelegatorsCountResponse> {
    return this.call<DelegatorsCountResponse>("delegators_count", {
      account,
    });
  }

  async deterministicKey(
    seed: string,
    index: number
  ): Promise<DeterministicKeyResponse> {
    return this.call<DeterministicKeyResponse>("deterministic_key", {
      seed,
      index: String(index),
    });
  }

  async epochUpgrade(
    epoch: number,
    key: string,
    count?: number,
    threads?: number
  ): Promise<EpochUpgradeResponse> {
    const params: any = { epoch: String(epoch), key };
    if (count) params.count = String(count);
    if (threads) params.threads = String(threads);
    return this.call<EpochUpgradeResponse>("epoch_upgrade", params);
  }

  async frontierCount(): Promise<FrontierCountResponse> {
    return this.call<FrontierCountResponse>("frontier_count");
  }

  async frontiers(account: string, count: number): Promise<FrontiersResponse> {
    return this.call<FrontiersResponse>("frontiers", {
      account,
      count: String(count),
    });
  }

  async keepalive(address: string, port: number): Promise<KeepaliveResponse> {
    return this.call<KeepaliveResponse>("keepalive", {
      address,
      port: String(port),
    });
  }

  async keyCreate(): Promise<KeyCreateResponse> {
    return this.call<KeyCreateResponse>("key_create");
  }

  async keyExpand(key: string): Promise<KeyExpandResponse> {
    return this.call<KeyExpandResponse>("key_expand", { key });
  }

  async ledger(
    account: string,
    count: number,
    options?: LedgerOptions
  ): Promise<LedgerResponse> {
    return this.call<LedgerResponse>("ledger", {
      account,
      count: String(count),
      ...options,
    });
  }

  async nodeId(): Promise<NodeIdResponse> {
    return this.call<NodeIdResponse>("node_id");
  }

  async nodeIdDelete(): Promise<NodeIdDeleteResponse> {
    return this.call<NodeIdDeleteResponse>("node_id_delete");
  }

  async peers(peerDetails?: boolean): Promise<PeersResponse> {
    return this.call<PeersResponse>("peers", { peer_details: peerDetails });
  }

  async populateBacklog(): Promise<PopulateBacklogResponse> {
    return this.call<PopulateBacklogResponse>("populate_backlog");
  }

  async process(
    block: any,
    options?: ProcessOptions
  ): Promise<ProcessResponse> {
    return this.call<ProcessResponse>("process", { block, ...options });
  }

  async receivable(
    account: string,
    count: number,
    options?: ReceivableOptions
  ): Promise<ReceivableResponse> {
    return this.call<ReceivableResponse>("receivable", {
      account,
      count: String(count),
      ...options,
    });
  }

  async pending(
    account: string,
    count: number,
    options?: AccountsPendingOptions
  ): Promise<PendingResponse> {
    return this.call<PendingResponse>("pending", {
      account,
      count: String(count),
      ...options,
    });
  }

  async receivableExists(
    hash: string,
    options?: ReceivableExistsOptions
  ): Promise<ReceivableExistsResponse> {
    return this.call<ReceivableExistsResponse>("receivable_exists", {
      hash,
      ...options,
    });
  }

  async pendingExists(
    hash: string,
    options?: PendingExistsOptions
  ): Promise<PendingExistsResponse> {
    return this.call<PendingExistsResponse>("pending_exists", {
      hash,
      ...options,
    });
  }

  async representativesOnline(
    weight?: boolean,
    accounts?: string[]
  ): Promise<RepresentativesOnlineResponse> {
    const params: any = {};
    if (weight) params.weight = weight;
    if (accounts) params.accounts = accounts;
    return this.call<RepresentativesOnlineResponse>(
      "representatives_online",
      params
    );
  }

  async representatives(
    count?: number,
    sorting?: boolean
  ): Promise<RepresentativesResponse> {
    const params: any = {};
    if (count) params.count = String(count);
    if (sorting) params.sorting = sorting;
    return this.call<RepresentativesResponse>("representatives", params);
  }

  async republish(
    hash: string,
    options?: RepublishOptions
  ): Promise<RepublishResponse> {
    return this.call<RepublishResponse>("republish", { hash, ...options });
  }

  async sign(params: SignParams): Promise<SignResponse> {
    return this.call<SignResponse>("sign", params);
  }

  async statsCounters(): Promise<StatsResponse> {
    return this.call<StatsResponse>("stats", { type: "counters" });
  }

  async statsSamples(): Promise<StatsResponse> {
    return this.call<StatsResponse>("stats", { type: "samples" });
  }

  async statsObjects(): Promise<StatsResponse> {
    return this.call<StatsResponse>("stats", { type: "objects" });
  }

  async statsDatabase(): Promise<StatsResponse> {
    return this.call<StatsResponse>("stats", { type: "database" });
  }

  async statsClear(): Promise<StatsClearResponse> {
    return this.call<StatsClearResponse>("stats_clear");
  }

  async stop(): Promise<StopResponse> {
    return this.call<StopResponse>("stop");
  }

  async successors(
    block: string,
    count: number,
    options?: ChainOptions
  ): Promise<SuccessorsResponse> {
    return this.call<SuccessorsResponse>("successors", {
      block,
      count: String(count),
      ...options,
    });
  }

  async telemetry(options?: TelemetryOptions): Promise<TelemetryResponse> {
    return this.call<TelemetryResponse>("telemetry", options);
  }

  async validateAccountNumber(
    account: string
  ): Promise<ValidateAccountNumberResponse> {
    return this.call<ValidateAccountNumberResponse>("validate_account_number", {
      account,
    });
  }

  async version(): Promise<VersionResponse> {
    return this.call<VersionResponse>("version");
  }

  async unchecked(
    count: number,
    options?: UncheckedOptions
  ): Promise<UncheckedResponse> {
    return this.call<UncheckedResponse>("unchecked", {
      count: String(count),
      ...options,
    });
  }

  async uncheckedClear(): Promise<UncheckedClearResponse> {
    return this.call<UncheckedClearResponse>("unchecked_clear");
  }

  async uncheckedGet(
    hash: string,
    options?: UncheckedGetOptions
  ): Promise<UncheckedGetResponse> {
    return this.call<UncheckedGetResponse>("unchecked_get", {
      hash,
      ...options,
    });
  }

  async uncheckedKeys(
    key: string,
    count: number,
    options?: UncheckedKeysOptions
  ): Promise<UncheckedKeysResponse> {
    return this.call<UncheckedKeysResponse>("unchecked_keys", {
      key,
      count: String(count),
      ...options,
    });
  }

  async unopened(
    account?: string,
    count?: number,
    threshold?: string
  ): Promise<UnopenedResponse> {
    const params: any = {};
    if (account) params.account = account;
    if (count) params.count = String(count);
    if (threshold) params.threshold = threshold;
    return this.call<UnopenedResponse>("unopened", params);
  }

  async uptime(): Promise<UptimeResponse> {
    return this.call<UptimeResponse>("uptime");
  }

  async workCancel(hash: string): Promise<WorkCancelResponse> {
    return this.call<WorkCancelResponse>("work_cancel", { hash });
  }

  async workGenerate(
    hash: string,
    options?: WorkGenerateOptions
  ): Promise<WorkGenerateResponse> {
    return this.call<WorkGenerateResponse>("work_generate", {
      hash,
      ...options,
    });
  }

  async workPeerAdd(
    address: string,
    port: number
  ): Promise<WorkPeerAddResponse> {
    return this.call<WorkPeerAddResponse>("work_peer_add", {
      address,
      port: String(port),
    });
  }

  async workPeersClear(): Promise<WorkPeersClearResponse> {
    return this.call<WorkPeersClearResponse>("work_peers_clear");
  }

  async workPeers(): Promise<WorkPeersResponse> {
    return this.call<WorkPeersResponse>("work_peers");
  }

  async workValidate(
    hash: string,
    work: string,
    options?: WorkValidateOptions
  ): Promise<WorkValidateResponse> {
    return this.call<WorkValidateResponse>("work_validate", {
      hash,
      work,
      ...options,
    });
  }
}
