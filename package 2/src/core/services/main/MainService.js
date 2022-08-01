import mainProxy from '../../proxies/main/MainProxy'
import { ServiceBase } from '../ServiceBase'

class MainService extends ServiceBase {
  getInfo(params) {
    return this.getData(() => mainProxy.getInfo(params))
  }
}

const mainService = new MainService()
export default mainService
