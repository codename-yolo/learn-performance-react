import { UserManager } from 'oidc-client'
import EventEmitter, {
  SESSION_TIME_OUT,
} from '../components/utils/EventEmitter'
import { IdentityServerConfig } from '../configs/IdentityServer'

class AuthenticationProvider {
  _usrMgr
  constructor() {
    this._usrMgr = new UserManager(IdentityServerConfig)
    let me = this
    this._usrMgr.events.addSilentRenewError(function (e) {
      me._usrMgr.getUser().then((user) => {
        if (!user || user.expired) {
          localStorage.clear()
          EventEmitter.dispatch(SESSION_TIME_OUT, '')
        }
      })
    })

    this._usrMgr.events.addUserSessionChanged(() => {
      console.log('fire')
    })
  }

  getStoreKey() {
    return `user:${IdentityServerConfig.authority}:${IdentityServerConfig.client_id}`
  }

  getUser() {
    return this._usrMgr.getUser()
  }

  signin() {
    this._usrMgr.signinRedirect()
  }

  signinCallback() {
    return this._usrMgr.signinRedirectCallback()
  }

  signout() {
    return this._usrMgr.signoutRedirect()
  }

  signinSilentCallback() {
    return this._usrMgr.signinSilentCallback()
  }

  signinSilent() {
    return this._usrMgr.signinSilent()
  }

  signinPopup() {
    return this._usrMgr.signinPopup()
  }
}

const authProvider = new AuthenticationProvider()
export default authProvider
