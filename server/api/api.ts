import { Express } from 'express'

import { authApi } from '../middleware/auth'

import {googleOauthRedirect} from '../provider/google'
import {facebookOauthRedirect} from '../provider/facebook'
import {dropboxOauthRedirect} from '../provider/dropbox'

import action from '../action/action'

const addRoutes = (app: Express) => {

    app.post('/api/auth/signup', action.auth.signup)
    app.post('/api/auth/login', action.auth.login)
    app.get('/api/auth/logout', action.auth.logout)

    app.get('/api/user/init', authApi, action.user.init)

    app.post('/api/organisation/name', action.organisation.name.update)


    app.post('/api/organisation/user/', action.organisation.user.get)

    app.post('/api/organisation/user/add', action.organisation.user.add)
    app.post('/api/organisation/user/delete', action.organisation.user.delete)

    app.get('/api/google/ouath2/redirect', googleOauthRedirect)
    app.get('/api/dropbox/ouath2/redirect', dropboxOauthRedirect)
    app.get('/api/facebook/ouath2/redirect', facebookOauthRedirect)
    
}

class Api {

    addRoutes = addRoutes

}

export default new Api()