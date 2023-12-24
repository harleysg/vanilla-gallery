import { API_FAIL_RESPONSE, STORAGE } from '../constants/index.js'
import { store, getStoreByKey } from '../utils/browser/storageEngine.js'

const ErrorFactory = (name = 'ErrorFactory') => {
  return class ErrorClassFactory extends Error {
    constructor (MESSAGE, OPTIONS = { callback: {} }) {
      super(MESSAGE)
      this.name = name
      this.response = JSON.parse(JSON.stringify(API_FAIL_RESPONSE))

      return this.reporter(MESSAGE, OPTIONS)
    }

    async reporter (message, options = { callback: {} }) {
      this.response.message = message
      this.response.type = this.name
      this.stack = (this.name && message && options?.origin)
        ? `${this.name}:\n${message}\n${options?.origin ?? ''}`
        : this.stack
      this.response.origin = options?.origin ?? ''
      this.response.timestamp = new Date().getTime()
      this.response.id = globalThis.crypto.randomUUID()
      this.response.callback = options?.callback

      try {
        await this.setReports(STORAGE.errorsReported)
      } catch (error) {
      // TODO
        console.warn({
          ...this.response,
          message: error
        })
      }

      return this.response
    }

    async setReports () {
      const listOfErrors = await getStoreByKey(STORAGE.errorsReported)
      store.setItem(STORAGE.errorsReported, JSON.stringify([...listOfErrors, this.response]))
      // TODO: Include a external reporter
      // setExternalReport()
    }
  }
}

export const ContextError = ErrorFactory('ContextError')
export const HTMLError = ErrorFactory('HTMLError')
