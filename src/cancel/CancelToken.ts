import { CancelExecutor, CancelTokenSource, Canceler } from "../types";

interface ResolvePromise {
  (reason?: string): void
}

/**
 * 外部实例化 CancelToken 得到 cancelToken
 * 此时 cancelToken.promise 处于 pending 状态
 * 一旦调用 cancelToken.promise.then 
 */
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = message
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}


