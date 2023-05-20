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
    return <div className='cursor-pointer' style={{lineHeight: '25px', display: 'flex'}} onClick={logout}>
        <i style={{ fontSize: '25px', color: 'grey'}} className="fa fa-sign-out" />
        <div style={{ marginTop : '-1px', marginLeft: '5px'}}>Logout</div>
        
    </div>
}

export default Logout