import ProxyBase from '../ProxyBase'

class MainProxy extends ProxyBase {
  getInfo(params) {
    return this.get('GetInfo', params)
  }
}

const mainProxy = new MainProxy('url')
export default mainProxy
