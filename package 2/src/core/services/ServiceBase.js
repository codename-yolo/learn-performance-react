import EventEmitter, {
  SHOW_POPUP_ERROR,
} from '../../components/utils/EventEmitter'
import { handleNameFileDownloadApi } from '../../components/utils/Export'
import { getLanguage } from '../../components/utils/Language'
import memoryCacheManager from '../cache/MemoryCacheManager'
import indexedDb from '../core/IndexedDB'

export class ServiceBase {
  getData = (promiseAction) => {
    return new Promise((resolve, reject) => {
      promiseAction()
        .then((res) => {
          if (!res || res.status === 204) {
            return resolve({})
          }
          return resolve(res.data)
        })
        .catch((err) => {
          if (
            ['post', 'delete'].includes(err?.response?.config?.method) &&
            err?.response?.data?.success === false
          ) {
            EventEmitter.dispatch(SHOW_POPUP_ERROR, err.response.data.errors)
          }

          return reject(err)
        })
    })
  }

  getFileDownload = (promiseAction) => {
    return new Promise((resolve, reject) => {
      promiseAction()
        .then((res) => {
          if (!res || res.status === 204) {
            return resolve({})
          }
          return resolve({
            data: res.data,
            filename: handleNameFileDownloadApi(
              res.headers['content-disposition'],
            ),
          })
        })
        .catch((err) => {
          if (err?.response?.data?.success === false) {
            EventEmitter.dispatch(SHOW_POPUP_ERROR, err.response.data.errors)
          }

          return reject(err)
        })
    })
  }

  applyMemoryCache =
    (
      key,
      params,
      absoluteExpireTime,
      slidingExpireTimeInMinute,
      removeCallback,
    ) =>
    (promiseAction) => {
      const cacheKey = this.getCacheKey(key, params)

      const cacheItem = memoryCacheManager.get(cacheKey)
      if (cacheItem) {
        return new Promise((resolve, reject) => resolve(cacheItem))
      }

      return promiseAction().then((response) => {
        if (!response || response.status === 204) {
          return {}
        }
        const data = response.data
        memoryCacheManager.add(
          cacheKey,
          data,
          absoluteExpireTime,
          slidingExpireTimeInMinute,
          removeCallback,
        )
        return data
      })
    }

  applySessionStorageCache =
    (
      key,
      params,
      absoluteExpireTime,
      slidingExpireTimeInMinute,
      removeCallback,
    ) =>
    (promiseAction) => {}

  applyLocalStorageCache =
    (
      key,
      params,
      absoluteExpireTime,
      slidingExpireTimeInMinute,
      removeCallback,
    ) =>
    (promiseAction) => {}

  //query is a function to query data from indexedDb,
  //by default, it get an item by key which is the first prop of params object
  useIndexedDB = (
    promise,
    params,
    storeName,
    query = (db, storeName, params) =>
      db.get(storeName, params[Object.keys(params)[0]]),
    isExpired = (data) => true,
    fallback = this.applyMemoryCache(storeName, params),
  ) => {
    try {
      query(indexedDb, storeName, params).then((res) => {
        if (res || (Array.isArray(res) && res.length > 0)) {
          if (!isExpired(res)) {
            return new Promise((resolve, reject) => resolve(res))
          }
        }

        return promise.then((response) => {
          const result = response.json()
          if (Array.isArray(result)) {
            indexedDb.upsertMany(storeName, result)
          } else {
            indexedDb.upsert(storeName, result)
          }
          return result
        })
      })
    } catch (e) {
      if (e.message === 'not supported') {
        fallback(promise)
      }
    }
  }

  getCacheKey(key, params) {
    return (
      key + JSON.stringify(this.formatParams(params)).replace(/[}{'.":]/g, '')
    )
  }

  formatParams = (params) => {
    return { lang: getLanguage(), ...params }
  }
}
