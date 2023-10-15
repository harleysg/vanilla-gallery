/* eslint-disable prefer-promise-reject-errors */
import { confirmTypeOf } from '../general/index.js'

const _WebStorageFactory = (storageName) => new Proxy({}, {
  get: (...input) => {
    const acceptedResources = ['getItem', 'setItem', 'removeItem', 'clear', 'key']
    const { 1: action } = input

    return async (key, value, options = {}) => {
      /* ----------------------------------- */
      if (action === undefined) {
        return Promise.reject({
          status: 'fail',
          message: 'Action not defined'
        })
      }
      /* ----------------------------------- */
      if (!acceptedResources.includes(action)) {
        return Promise.reject({
          status: 'fail',
          message: `Resource '${action}' not accepted, please use: ${acceptedResources}`
        })
      }
      /* ----------------------------------- */
      if (action === acceptedResources[1]) {
        window[storageName][action](key, value)

        return Promise.resolve({
          status: 'ok',
          message: 'setItem'
        })
      }
      /* ----------------------------------- */
      if (action === acceptedResources[0]) {
        const data = window[storageName][action](key)

        return Promise.resolve({
          status: 'ok',
          message: 'getItem',
          data
        })
      }

      return Promise.resolve({
        status: 'ok',
        message: '',
        data: ''
      })
    }
  }
})

export const store = _WebStorageFactory('localStorage')
export const session = _WebStorageFactory('sessionStorage')
export async function getStoreByKey (storeKey) {
  const listOfErrors = []
  return store.getItem(storeKey)
    .then((dataStored) => {
      const stored = dataStored?.data
      const validate = confirmTypeOf(stored)
      // ----------------------------
      if (validate.isNotValid) return Promise.resolve(listOfErrors)
      // ----------------------------
      if (validate.isString && !validate.isObjectStringified) return Promise.resolve(stored)
      // ----------------------------
      if (validate.isString && validate.isObjectStringified) return Promise.resolve(JSON.parse(stored))
      // ----------------------------
      if (validate.isArray && stored.length > 0) return Promise.resolve([...stored])
      // ----------------------------
      if (validate.isObject && !validate.isNull && !validate.isUndefined) return Promise.resolve(stored)
      // ----------------------------
    })
}
