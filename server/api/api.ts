import { Express } from 'express'

import {googleOauthRedirect} from '../provider/google'
import {facebookOauthRedirect} from '../provider/facebook'
import {dropboxOauthRedirect} from '../provider/dropbox'

import { signup, login, logout } from '../action/action'


const AddRoutes = (app: Express) => {

    app.post('/api/signup', signup)
    app.post('/api/login', login)
    app.get('/api/logout', logout)

    app.get('/api/google/ouath2/redirect', googleOauthRedirect)
    app.get('/api/dropbox/ouath2/redirect', dropboxOauthRedirect)
    app.get('/api/facebook/ouath2/redirect', facebookOauthRedirect)
    
}

class Api {

    AddRoutes = AddRoutes

}

export default new Api()