import Web3ProviderEngine from 'web3-provider-engine'
import { JSONRPCRequestPayload } from 'ethereum-types'
import { promisify } from './utils'

export default class Subprovider {
  engine?: Web3ProviderEngine

  _createFinalPayload(payload: JSONRPCRequestPayload): JSONRPCRequestPayload {
    const finalPayload = {
      id: this._getRandomId(),
      jsonrpc: '2.0',
      params: [],
      ...payload
    }
    return finalPayload
  }

  _getRandomId(): Number {
    const extraDigits = 3
    const baseTen = 10
    const datePart = new Date().getTime() * Math.pow(baseTen, extraDigits)
    const extraPart = Math.floor(Math.random() * Math.pow(baseTen, extraDigits))
    return datePart + extraPart
  }

  async handleRequest(): Promise<void> {
    return
  }

  async emitPayloadAsync(payload: JSONRPCRequestPayload): Promise<any> {
    const finalPayload = this._createFinalPayload(payload)
    const response = await promisify(this.engine.sendAsync, this.engine)(
      finalPayload
    )
    return response
  }

  setEngine(engine: Web3ProviderEngine) {
    this.engine = engine
  }
}
