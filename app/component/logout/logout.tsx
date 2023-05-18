import React from 'react'
import Url from '../../module/url/url'
import resource from '../../resource/resource'
import Cookie from '../../module/cookie/cookie'
import Storage from '../../module/storage/storage'
import { CONST_KEYS } from '../../const/const'

const logout = async () => {
    await resource.api.logout()
    await Storage.remove(CONST_KEYS.authorization)
    Cookie.remove(CONST_KEYS.authorization)
    Url.changePath('/Login')

}

const Logout  = () => {
    return <div onClick={logout}>Logout</div>
}

export default Logout