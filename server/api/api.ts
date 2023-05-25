import { Express } from 'express'

import { authApi } from '../middleware/auth'

import {googleOauthRedirect} from '../provider/google'
import {facebookOauthRedirect} from '../provider/facebook'
import {dropboxOauthRedirect} from '../provider/dropbox'

import Action from '../action/action'

const AddRoutes = (app: Express) => {

    app.post('/api/auth/signup', Action.Auth.Signup)
    app.post('/api/auth/login', Action.Auth.Login)
    app.get('/api/auth/logout', Action.Auth.Logout)


    app.get('/api/user/init', authApi, Action.User.Init)

    //@ts-ignore
    app.get('/api/organisation/', authApi, Action.Organisation.Get)
    //@ts-ignore
    app.get('/api/organisation/:id', authApi, Action.Organisation.GetById)
    //@ts-ignore
    app.get('/api/organisation/update', authApi, Action.Organisation.Update)

    app.get('/api/google/ouath2/redirect', googleOauthRedirect)
    app.get('/api/dropbox/ouath2/redirect', dropboxOauthRedirect)
    app.get('/api/facebook/ouath2/redirect', facebookOauthRedirect)
    
}

class Api {

    AddRoutes = AddRoutes

}

export default new Api()