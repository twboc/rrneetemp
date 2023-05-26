
import url from '../module/url/url'
import resource from '../resource/resource'
import cookie from '../module/cookie/cookie'
import storage from '../module/storage/storage'
import {CONST_KEYS} from '../const/const'

const logout = async () => {
  await resource.api.auth.logout()
  await storage.remove(CONST_KEYS.authorization)
  cookie.remove(CONST_KEYS.authorization)
  url.changePath('/login')
}

class Auth {
    logout = logout
}

class Action {
    auth = new Auth()
}


export default new Action()