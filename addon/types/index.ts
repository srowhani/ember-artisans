export interface JSONRPCTransport {
  jsonrpc: string,
  id: string
}

export interface JSONRPCRequest extends JSONRPCTransport {
  method: string,
  params: any[],
}

export interface JSONRPCResponse extends JSONRPCTransport {
  result?: any,
  error?: {
    message: string
  }
}

export interface WorkerProxyStrategy<K> {
  [method: string]: K
}

export interface Artisan extends Worker, WorkerProxyStrategy<any> {
  id: string,
  isRunning?: boolean,
}