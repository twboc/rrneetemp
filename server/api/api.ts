import { Express } from 'express'

import { authApi } from '../middleware/auth'

import {googleOauthRedirect} from '../provider/google'
import {facebookOauthRedirect} from '../provider/facebook'
import {dropboxOauthRedirect} from '../provider/dropbox'

import action from '../action/action'

const AddRoutes = (app: Express) => {

    app.post('/api/auth/signup', action.Auth.Signup)
    app.post('/api/auth/login', action.Auth.Login)
    app.get('/api/auth/logout', action.Auth.Logout)


    app.get('/api/user/init', authApi, action.User.Init)

    //@ts-ignore
    app.get('/api/organisation/', authApi, action.Organisation.Get)
    //@ts-ignore
    app.post('/api/organisation/name', action.Organisation.ChangeName)
    //@ts-ignore
    app.get('/api/organisation/:id', authApi, action.Organisation.GetById)
    //@ts-ignore
    app.get('/api/organisation/update/', authApi, action.Organisation.Update)

    app.get('/api/google/ouath2/redirect', googleOauthRedirect)
    app.get('/api/dropbox/ouath2/redirect', dropboxOauthRedirect)
    app.get('/api/facebook/ouath2/redirect', facebookOauthRedirect)
    
}

class Api {

    AddRoutes = AddRoutes

}

export default new Api()