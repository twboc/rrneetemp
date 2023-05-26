import React from 'react'
import url from '../../module/url/url'
import resource from '../../resource/resource'
import cookie from '../../module/cookie/cookie'
import storage from '../../module/storage/storage'
import {CONST_KEYS} from '../../const/const'

const logout = async () => {
  await resource.api.auth.logout()
  await storage.remove(CONST_KEYS.authorization)
  cookie.remove(CONST_KEYS.authorization)
  url.changePath('/login')
}

const Logout = () => {
  return (
    <div
      className="cursor-pointer"
      style={{lineHeight: '25px', display: 'flex'}}
      onClick={logout}>
      <i style={{fontSize: '25px', color: 'grey'}} className="fa fa-sign-out" />
      <div style={{marginTop: '-1px', marginLeft: '5px'}}>Logout</div>
    </div>
  )
}

export default Logout
