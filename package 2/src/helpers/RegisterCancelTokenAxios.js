import axios from 'axios'

class RegisterCancelTokenAxios {
  sources = {}
  cacheKeys = {}

  register(name, cacheKey) {
    this.cacheKeys[name] = cacheKey
    const source = axios.CancelToken.source()
    this.add(source, name)
    return source
  }

  add(source, name) {
    if (this.sources[name]) {
      this.sources[name].push(source)
    } else {
      this.sources[name] = [source]
    }
  }

  delete(name) {
    if (this.sources[name]) {
      this.sources[name].forEach((source) => {
        source.cancel()
      })
      delete this.sources[name]
    }
  }
}

const registerCancelTokenAxios = new RegisterCancelTokenAxios()
export default registerCancelTokenAxios
