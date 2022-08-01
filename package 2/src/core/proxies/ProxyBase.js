import axios from 'axios'
import EventEmitter, { API_TIMEOUT } from '../../components/utils/EventEmitter'
import { getLanguage } from '../../components/utils/Language'
import { IS_PUBLIC_SERVICE } from '../../configs/Common'
import registerCancelTokenAxios from '../../helpers/RegisterCancelTokenAxios'
import authProvider from '../core/AuthenticationProvider'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      EventEmitter.dispatch(API_TIMEOUT, '')
    }

    if (error.response && error.response.status === 401) {
      console.log('unauthorized!')
      // window.location.href = '/'
    }
    // setTimeout(() => {
    //   console.clear()
    // }, 0)

    return Promise.reject(error)
  },
)

axios.interceptors.request.use(function (config) {
  config.headers.language = getLanguage()
  return config
})

export default class ProxyBase {
  baseServiceUrl = ''

  constructor(url) {
    this.baseServiceUrl = url
  }

  get(methodName, data, type, disableCancelToken = false) {
    const url = this.baseServiceUrl + methodName
    const params = {
      ...data,
    }

    registerCancelTokenAxios.delete(url)
    const source = registerCancelTokenAxios.register(url)

    const config = {
      params,
      timeout: 35000,
    }

    if (source && !disableCancelToken) {
      config.cancelToken = source.token
    }

    if (type === 'download') {
      config.responseType = 'blob'
    }

    if (IS_PUBLIC_SERVICE) {
      return axios.get(url, config).then((data) => {
        registerCancelTokenAxios.delete(url)
        return data
      })
    }

    return authProvider.getUser().then((user) => {
      axios.defaults.headers.common.Authorization = `Bearer ${
        user ? user.access_token : ''
      }`

      return axios.get(url, config).then((data) => {
        registerCancelTokenAxios.delete(url)
        return data
      })
    })
  }

  post(path, data, config = {}, type, disableCancelToken = false) {
    const url = this.baseServiceUrl + path

    registerCancelTokenAxios.delete(url)
    const source = registerCancelTokenAxios.register(url)

    if (source && !disableCancelToken) {
      config.cancelToken = source.token
    }

    if (type === 'download') {
      config.responseType = 'blob'
    }

    if (IS_PUBLIC_SERVICE) {
      return axios
        .post(`${this.baseServiceUrl}${path}`, data, config)
        .then((data) => {
          registerCancelTokenAxios.delete(url)
          return data
        })
    }

    return authProvider.getUser().then((user) => {
      axios.defaults.headers.common.Authorization = `Bearer ${
        user ? user.access_token : ''
      }`

      return axios
        .post(`${this.baseServiceUrl}${path}`, data, config)
        .then((data) => {
          registerCancelTokenAxios.delete(url)
          return data
        })
    })
  }

  delete(path, params, config = {}) {
    config.data = { ...params }

    if (IS_PUBLIC_SERVICE) {
      return axios.delete(`${this.baseServiceUrl}${path}`, config)
    }

    return authProvider.getUser().then((user) => {
      axios.defaults.headers.common.Authorization = `Bearer ${
        user ? user.access_token : ''
      }`

      return axios.delete(`${this.baseServiceUrl}${path}`, config)
    })
  }
}
