// Base RPC Types
export interface RpcRequest {
  action: string;
  [key: string]: any;
}

export interface RpcResponse {
  error?: string;
  [key: string]: any;
}

// Authentication Types
export interface AuthenticationOptions {
  type: "bearer" | "apiKey" | "basic" | "none";
  token?: string;
  key?: string;
  username?: string;
  password?: string;
}

// Response Types
export interface AccountBalanceResponse extends RpcResponse {
  balance: string;
  pending: string;
  receivable: string;
}

export interface AccountBlockCountResponse extends RpcResponse {
  block_count: string;
}

export interface AccountGetResponse extends RpcResponse {
  account: string;
}

export interface AccountHistoryResponse extends RpcResponse {
  account: string;
  history: AccountHistoryEntry[];
  previous?: string;
  next?: string; // for reverse history
}

export interface AccountHistoryEntry {
  type: "send" | "receive" | string; // Can be 'change', 'state' etc. if raw=true
  account: string;
  amount: string;
  local_timestamp: string;
  height: string;
  hash: string;
  confirmed: string;
  subtype?: string; // For raw history
  [key: string]: any; // To accommodate raw=true and other fields
}

export interface AccountInfoResponse extends RpcResponse {
  frontier: string;
  open_block: string;
  representative_block: string;
  balance: string;
  modified_timestamp: string;
  block_count: string;
  account_version: string;
  confirmation_height?: string;
  confirmation_height_frontier?: string;
  representative?: string;
  confirmed_representative?: string;
  weight?: string;
  pending?: string;
  receivable?: string;
  confirmed_balance?: string;
  confirmed_height?: string;
  confirmed_frontier?: string;
  confirmed_pending?: string;
  confirmed_receivable?: string;
}

export interface AccountKeyResponse extends RpcResponse {
  key: string;
}

export interface AccountRepresentativeResponse extends RpcResponse {
  representative: string;
}

export interface AccountWeightResponse extends RpcResponse {
  weight: string;
}

export interface AccountsBalancesResponse extends RpcResponse {
  balances: {
    [account: string]: {
      balance: string;
      pending: string;
      receivable: string;
      error?: string; // Version 24.0+ error handling
    };
  };
  errors?: {
    // Version 25.0+ error handling
    [account: string]: string;
  };
}

export interface AccountsFrontiersResponse extends RpcResponse {
  frontiers: {
    [account: string]: string | string; // string in v24.0+ errors
  };
  errors?: {
    // Version 25.0+ error handling
    [account: string]: string;
  };
}

export interface AccountsReceivableResponse extends RpcResponse {
  blocks: {
    [account: string]: string[] | ReceivableBlockMap | ReceivableBlockSourceMap;
  };
}

export interface AccountsPendingResponse extends RpcResponse {
  blocks: {
    [account: string]: string[] | ReceivableBlockMap | ReceivableBlockSourceMap;
  };
}

export interface ReceivableBlockMap {
  [hash: string]: string; // amount
}

export interface ReceivableBlockSourceMap {
  [hash: string]: {
    amount: string;
    source: string;
  };
}

export interface AccountsRepresentativesResponse extends RpcResponse {
  representatives: {
    [account: string]: string | string; // string in v24.0+ errors
  };
  errors?: {
    // Version 25.0+ error handling
    [account: string]: string;
  };
}

export interface AvailableSupplyResponse extends RpcResponse {
  available: string;
}

export interface BlockAccountResponse extends RpcResponse {
  account: string;
}

export interface BlockConfirmResponse extends RpcResponse {
  started: string;
}

export interface BlockCountResponse extends RpcResponse {
  count: string;
  unchecked: string;
  cemented?: string;
}

export interface BlockCreateResponse extends RpcResponse {
  hash: string;
  block: any | string; // Can be JSON object or string
  difficulty?: string; // since V21.0
}

export interface BlockHashResponse extends RpcResponse {
  hash: string;
}

export interface BlockInfoResponse extends RpcResponse {
  block_account: string;
  amount: string;
  balance: string;
  height: string;
  local_timestamp: string;
  successor?: string;
  confirmed: string;
  contents: any | string; // Can be JSON object or string
  subtype?: "send" | "receive" | "change" | "epoch" | string;
  receive_hash?: string; // since v24.0
}

export interface BlocksResponse extends RpcResponse {
  blocks: {
    [hash: string]: any | string; // Can be JSON object or string
  };
}

export interface BlocksInfoResponse extends RpcResponse {
  blocks: {
    [hash: string]: BlockInfoDetails;
  };
  blocks_not_found?: string[]; // since v19.0
}

export interface BlockInfoDetails extends BlockInfoResponse {
  pending?: string;
  source_account?: string;
}

export interface BootstrapResponse extends RpcResponse {
  success: string;
}

export interface BootstrapAnyResponse extends RpcResponse {
  success: string;
}

export interface BootstrapLazyResponse extends RpcResponse {
  started: string;
  key_inserted: string;
}

export interface BootstrapStatusResponse extends RpcResponse {
  bootstrap_threads?: string;
  running_attempts_count?: string;
  total_attempts_count?: string;
  connections?: {
    clients: string;
    connections: string;
    idle: string;
    target_connections: string;
    pulls: string;
  };
  attempts?: BootstrapAttempt[];
  clients?: string; // for older versions
  pulls?: string; // for older versions
  pulling?: string; // for older versions
  idle?: string; // for older versions
  target_connections?: string; // for older versions
  total_blocks?: string; // for older versions
  runs_count?: string; // for older versions
  requeued_pulls?: string; // for older versions
  frontiers_received?: string; // for older versions
  frontiers_confirmed?: string; // for older versions
  mode?: string; // for older versions
  lazy_blocks?: string; // for older versions
  lazy_state_backlog?: string; // for older versions
  lazy_balances?: string; // for older versions
  lazy_destinations?: string; // for older versions
  lazy_undefined_links?: string; // for older versions
  lazy_pulls?: string; // for older versions
  lazy_keys?: string; // for older versions
  lazy_key_1?: string; // for older versions
  duration?: string; // for older versions
}

export interface BootstrapAttempt {
  id: string;
  mode: string;
  started: string;
  pulling: string;
  total_blocks: string;
  requeued_pulls: string;
  frontier_pulls?: string;
  frontiers_received: string;
  frontiers_confirmed: string;
  frontiers_confirmation_pending: string;
  frontiers_age: string;
  last_account: string;
  duration: string;
  lazy_blocks?: string;
  lazy_state_backlog?: string;
  lazy_balances?: string;
  lazy_destinations?: string;
  lazy_undefined_links?: string;
  lazy_pulls?: string;
  lazy_keys?: string;
  lazy_key_1?: string;
}

export interface ChainResponse extends RpcResponse {
  blocks: string[];
}

export interface ConfirmationActiveResponse extends RpcResponse {
  confirmations: string[];
  unconfirmed?: string; // since V21.0
  confirmed?: string; // since V21.0
}

export interface ConfirmationHeightCurrentlyProcessingResponse
  extends RpcResponse {
  hash: string;
}

export interface ConfirmationHistoryResponse extends RpcResponse {
  confirmation_stats: ConfirmationStats;
  confirmations: ConfirmationDetails[] | string; // Can be array or empty string if no confirmations for hash
}

export interface ConfirmationStats {
  count: string;
  average?: string;
}

export interface ConfirmationDetails {
  hash: string;
  duration: string;
  time: string;
  tally: string;
  blocks?: string; // since V21.0
  voters?: string; // since V21.0
  request_count?: string; // since V20.0
}

export interface ConfirmationInfoResponse extends RpcResponse {
  announcements: string;
  voters: string;
  last_winner: string;
  total_tally: string;
  blocks: {
    [hash: string]: ConfirmationBlockInfo;
  };
}

export interface ConfirmationBlockInfo {
  tally: string;
  contents: any | string; // Can be JSON object or string
  representatives?: {
    [account: string]: string;
  };
}

export interface ConfirmationQuorumResponse extends RpcResponse {
  quorum_delta: string;
  online_weight_quorum_percent: string;
  online_weight_minimum: string;
  online_stake_total: string;
  peers_stake_total: string;
  trended_stake_total: string;
  peers_stake_required?: string; // since v19.0, removed in v22.0
  peer_details?: PeerStakeDetail[]; // since v17.0
}

export interface PeerStakeDetail {
  account: string;
  ip: string;
  weight: string;
}

export interface DelegatorsResponse extends RpcResponse {
  delegators: {
    [account: string]: string;
  };
}

export interface DelegatorsCountResponse extends RpcResponse {
  count: string;
}

export interface DeterministicKeyResponse extends RpcResponse {
  private: string;
  public: string;
  account: string;
}

export interface EpochUpgradeResponse extends RpcResponse {
  started: string;
}

export interface FrontierCountResponse extends RpcResponse {
  count: string;
}

export interface FrontiersResponse extends RpcResponse {
  frontiers: {
    [account: string]: string;
  };
}

export interface KeepaliveResponse extends RpcResponse {
  started: string;
}

export interface KeyCreateResponse extends RpcResponse {
  private: string;
  public: string;
  account: string;
}

export interface KeyExpandResponse extends RpcResponse {
  private: string;
  public: string;
  account: string;
}

export interface LedgerResponse extends RpcResponse {
  accounts: {
    [account: string]: LedgerAccountInfo;
  };
}

export interface LedgerAccountInfo {
  frontier: string;
  open_block: string;
  representative_block: string;
  balance: string;
  modified_timestamp: string;
  block_count: string;
  representative?: string;
  weight?: string;
  pending?: string;
  receivable?: string;
}

export interface NodeIdResponse extends RpcResponse {
  private: string;
  public: string;
  as_account: string; // deprecated
  node_id: string;
}

export interface NodeIdDeleteResponse extends RpcResponse {
  deprecated: string;
}

export interface PeersResponse extends RpcResponse {
  peers: string[] | PeerDetailsMap;
}

export interface PeerDetailsMap {
  [ipPort: string]: string | PeerDetail; // before v8.0 was just string
}

export interface PeerDetail {
  protocol_version: string;
  node_id: string;
  type: "tcp" | string;
}

export interface PopulateBacklogResponse extends RpcResponse {
  success: string;
}

export interface ProcessResponse extends RpcResponse {
  hash: string;
}

export interface ReceivableResponse extends RpcResponse {
  blocks: string[] | ReceivableBlockMap | ReceivableBlockSourceMap;
}

export interface PendingResponse extends RpcResponse {
  blocks: string[] | ReceivableBlockMap | ReceivableBlockSourceMap;
}

export interface ReceivableExistsResponse extends RpcResponse {
  exists: string; // "1" or "0"
}

export interface PendingExistsResponse extends RpcResponse {
  exists: string; // "1" or "0"
}

export interface RepresentativesOnlineResponse extends RpcResponse {
  representatives: string[] | RepresentativesOnlineWeightMap;
}

export interface RepresentativesOnlineWeightMap {
  [account: string]: string | RepresentativeWeightDetail; // before v17.0 was string
}

export interface RepresentativeWeightDetail {
  weight: string;
}

export interface RepresentativesResponse extends RpcResponse {
  representatives: {
    [account: string]: string;
  };
}

export interface RepublishResponse extends RpcResponse {
  success: string;
  blocks: string[];
}

export interface SignResponse extends RpcResponse {
  signature: string;
  block: any | string; // Can be JSON object or string
}

export interface StatsResponse extends RpcResponse {
  type: "counters" | "samples" | "objects" | "database" | string;
  created: string;
  entries?: StatsEntry[]; // for counters and samples
  stat_duration_seconds?: string; // since v18.0
  node?: any; // for objects, unstable object
  branch_pages?: string; // for database LMDB
  depth?: string; // for database LMDB
  leaf_pages?: string; // for database LMDB
  overflow_pages?: string; // for database LMDB
  page_size?: string; // for database LMDB
  [key: string]: any; // for database RocksDB - dynamic keys
}

export interface StatsEntry {
  time: string;
  type: string;
  detail: string;
  dir: "in" | "out" | string;
  value: string;
}

export interface StatsClearResponse extends RpcResponse {
  success: string;
}

export interface StopResponse extends RpcResponse {
  success: string;
}

export interface SuccessorsResponse extends RpcResponse {
  blocks: string[];
}

export interface TelemetryResponse extends RpcResponse {
  block_count: string;
  cemented_count: string;
  unchecked_count: string;
  account_count: string;
  bandwidth_cap: string;
  peer_count: string;
  protocol_version: string;
  uptime: string;
  genesis_block: string;
  major_version: string;
  minor_version: string;
  patch_version: string;
  pre_release_version: string;
  maker: string;
  timestamp: string;
  active_difficulty?: string; // since v21.0, deprecated in v22.0 for network_current
  metrics?: TelemetryMetric[]; // for raw=true
}

export interface TelemetryMetric extends TelemetryResponse {
  node_id: string;
  signature: string;
  address: string;
  port: string;
}

export interface ValidateAccountNumberResponse extends RpcResponse {
  valid: string; // "1" or "0"
}

export interface VersionResponse extends RpcResponse {
  rpc_version: string;
  store_version: string;
  protocol_version: string;
  node_vendor: string;
  store_vendor?: string; // since V21.0
  network?: string; // since v20.0
  network_identifier?: string; // since v20.0
  build_info?: string; // since v20.0
}

export interface UncheckedResponse extends RpcResponse {
  blocks: {
    [hash: string]: any | string; // Can be JSON object or string
  };
}

export interface UncheckedClearResponse extends RpcResponse {
  success: string;
}

export interface UncheckedGetResponse extends RpcResponse {
  modified_timestamp: string;
  contents: any | string; // Can be JSON object or string
}

export interface UncheckedKeysResponse extends RpcResponse {
  unchecked: UncheckedKeyBlock[];
}

export interface UncheckedKeyBlock {
  key: string;
  hash: string;
  modified_timestamp: string;
  contents: any | string; // Can be JSON object or string
}

export interface UnopenedResponse extends RpcResponse {
  accounts: {
    [account: string]: string;
  };
}

export interface UptimeResponse extends RpcResponse {
  seconds: string;
}

export interface WorkCancelResponse extends RpcResponse {
  success: string;
}

export interface WorkGenerateResponse extends RpcResponse {
  work: string;
  difficulty?: string; // of the resulting work
  multiplier?: string; // since v19.0, calculated from default base difficulty
  hash?: string; // since v20.0
}

export interface WorkPeerAddResponse extends RpcResponse {
  success: string;
}

export interface WorkPeersClearResponse extends RpcResponse {
  success: string;
}

export interface WorkPeersResponse extends RpcResponse {
  work_peers: string[];
}

export interface WorkValidateResponse extends RpcResponse {
  valid_all?: string; // since v21.0
  valid_receive?: string; // since v21.0
  valid?: string; // up to v20.0
  difficulty?: string;
  multiplier?: string;
}

// Helper Types
export interface BlockCreateParams extends Record<string, any> {
  jsonBlock?: boolean;
  type: "state" | string;
}

export interface SignParams extends Record<string, any> {
  jsonBlock?: boolean;
  key?: string;
  wallet?: string;
  account?: string;
  block?: any;
  hash?: string;
}

// --- Utility type to make all properties optional ---
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export interface UncheckedOptions
  extends PartialRecord<
    keyof UncheckedRequestParams,
    string | number | boolean
  > {}
export interface UncheckedRequestParams {
  count: number;
  json_block: boolean;
}

export interface UncheckedGetOptions
  extends PartialRecord<keyof UncheckedGetRequestParams, string | boolean> {}
export interface UncheckedGetRequestParams {
  hash: string;
  json_block: boolean;
}

export interface UncheckedKeysOptions
  extends PartialRecord<
    keyof UncheckedKeysRequestParams,
    string | number | boolean
  > {}
export interface UncheckedKeysRequestParams {
  key: string;
  count: number;
  json_block: boolean;
}

export interface TelemetryOptions
  extends PartialRecord<keyof TelemetryRequestParams, string | boolean> {}
export interface TelemetryRequestParams {
  raw: boolean;
  address: string;
  port: number;
}

export interface SignOptions
  extends PartialRecord<keyof SignRequestParams, string | boolean | any> {}
export interface SignRequestParams {
  json_block: boolean;
  key: string;
  wallet: string;
  account: string;
  block: any;
  hash: string;
}

export interface RepublishOptions
  extends PartialRecord<
    keyof RepublishRequestParams,
    string | number | boolean
  > {}
export interface RepublishRequestParams {
  count: number;
  sources: boolean;
  destinations: boolean;
  hash: string;
}

export interface ProcessOptions
  extends PartialRecord<keyof ProcessRequestParams, string | boolean | any> {}
export interface ProcessRequestParams {
  json_block: boolean;
  subtype: string;
  block: any;
  force: boolean;
  watch_work: boolean;
  async: boolean;
}

export interface LedgerOptions
  extends PartialRecord<keyof LedgerRequestParams, string | number | boolean> {}
export interface LedgerRequestParams {
  count: number;
  representative: boolean;
  weight: boolean;
  receivable: boolean;
  modified_since: number;
  sorting: boolean;
  threshold: string;
  account: string;
}

export interface ConfirmationInfoOptions
  extends PartialRecord<
    keyof ConfirmationInfoRequestParams,
    string | boolean
  > {}
export interface ConfirmationInfoRequestParams {
  contents: boolean;
  json_block: boolean;
  representatives: boolean;
  root: string;
}

export interface ConfirmationHistoryOptions
  extends PartialRecord<keyof ConfirmationHistoryRequestParams, string> {}
export interface ConfirmationHistoryRequestParams {
  hash: string;
}

export interface ChainOptions
  extends PartialRecord<keyof ChainRequestParams, string | number | boolean> {}
export interface ChainRequestParams {
  block: string;
  count: number;
  offset: number;
  reverse: boolean;
}

export interface BlockInfoOptions
  extends PartialRecord<keyof BlockInfoRequestParams, string | boolean> {}
export interface BlockInfoRequestParams {
  json_block: boolean;
  hash: string;
  pending: boolean;
  source: boolean;
  receive_hash: boolean;
}

export interface BlocksOptions
  extends PartialRecord<keyof BlocksRequestParams, string | boolean> {}
export interface BlocksRequestParams {
  hashes: string[];
  json_block: boolean;
}

export interface BlocksInfoOptions
  extends PartialRecord<keyof BlocksInfoRequestParams, string | boolean> {}
export interface BlocksInfoRequestParams {
  hashes: string[];
  json_block: boolean;
  pending: boolean;
  source: boolean;
  include_not_found: boolean;
  receive_hash: boolean;
}

export interface BlockCreateOptions
  extends PartialRecord<
    keyof BlockCreateRequestParams,
    string | boolean | number | any
  > {}
export interface BlockCreateRequestParams {
  json_block: boolean;
  type: string;
  balance: string;
  wallet: string;
  account: string;
  key: string;
  source: string;
  destination: string;
  link: string;
  representative: string;
  previous: string;
  work: string;
  version: string;
  difficulty: string;
}

export interface AccountHistoryOptions
  extends PartialRecord<
    keyof AccountHistoryRequestParams,
    string | boolean | number | string[]
  > {}
export interface AccountHistoryRequestParams {
  raw: boolean;
  head: string;
  offset: number;
  reverse: boolean;
  account_filter: string[];
}

export interface ReceivableOptions
  extends PartialRecord<
    keyof ReceivableRequestParams,
    string | boolean | number
  > {}
export interface ReceivableRequestParams {
  count: number;
  threshold: string;
  source: boolean;
  include_active: boolean;
  min_version: boolean;
  sorting: boolean;
  include_only_confirmed: boolean;
}

export interface PendingOptions
  extends PartialRecord<
    keyof PendingRequestParams,
    string | boolean | number
  > {}
export interface PendingRequestParams {
  count: number;
  threshold: string;
  source: boolean;
  include_active: boolean;
  sorting: boolean;
  include_only_confirmed: boolean;
}

export interface AccountsReceivableOptions
  extends PartialRecord<
    keyof AccountsReceivableRequestParams,
    string | boolean | number
  > {}
export interface AccountsReceivableRequestParams {
  threshold: string;
  source: boolean;
  include_active: boolean;
  sorting: boolean;
  include_only_confirmed: boolean;
}

export interface AccountsPendingOptions
  extends PartialRecord<
    keyof AccountsPendingRequestParams,
    string | boolean | number
  > {}
export interface AccountsPendingRequestParams {
  threshold: string;
  source: boolean;
  include_active: boolean;
  sorting: boolean;
  include_only_confirmed: boolean;
}

export interface ReceivableExistsOptions
  extends PartialRecord<
    keyof ReceivableExistsRequestParams,
    string | boolean
  > {}
export interface ReceivableExistsRequestParams {
  include_active: boolean;
  include_only_confirmed: boolean;
}

export interface PendingExistsOptions
  extends PartialRecord<keyof PendingExistsRequestParams, string | boolean> {}
export interface PendingExistsRequestParams {
  include_active: boolean;
  include_only_confirmed: boolean;
}

export interface AccountInfoOptions
  extends PartialRecord<keyof AccountInfoRequestParams, string | boolean> {}
export interface AccountInfoRequestParams {
  representative: boolean;
  weight: boolean;
  pending: boolean;
  include_confirmed: boolean;
  receivable: boolean;
}

export interface WorkValidateOptions
  extends PartialRecord<keyof WorkValidateRequestParams, string | boolean> {}
export interface WorkValidateRequestParams {
  difficulty: string;
  multiplier: string;
  version: string;
}

export interface WorkGenerateOptions
  extends PartialRecord<
    keyof WorkGenerateRequestParams,
    string | boolean | number | any
  > {}
export interface WorkGenerateRequestParams {
  use_peers: boolean;
  difficulty: string;
  multiplier: number;
  account: string;
  version: string;
  block: any;
  json_block: boolean;
}
