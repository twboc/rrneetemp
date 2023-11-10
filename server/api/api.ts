import { Express } from 'express'

import URL from '../../shared/url/url'

import { authApi } from '../middleware/auth'

import {googleOauthRedirect} from '../provider/google'
import {facebookOauthRedirect} from '../provider/facebook'
import {dropboxOauthRedirect} from '../provider/dropbox'

import action from '../action/action'

const addRoutes = (app: Express) => {

    app.post(URL.AUTH.SIGNUP, action.auth.signup)
    app.post(URL.AUTH.LOGIN, action.auth.login)
    app.get(URL.AUTH.LOGOUT, action.auth.logout)

    app.get(URL.USER.INIT, authApi, action.user.init)

    app.post(URL.ORGANISATION.NAME.GET, action.organisation.name.update)
    app.post(URL.ORGANISATION.USER.GET, action.organisation.user.get)
    app.post(URL.ORGANISATION.USER.ADD, action.organisation.user.add)
    app.post(URL.ORGANISATION.USER.DELETE, action.organisation.user.delete)

    app.post(URL.TRACKER.DOMAIN.CREATE, action.tracker.domain.create)
    app.post(URL.TRACKER.DOMAIN.GET.ALL, action.tracker.domain.get.all)

    app.get(URL.GOOGLE.OAUTH2.REDIRECT, googleOauthRedirect)
    app.get(URL.DROPBOX.OAUTH2.REDIRECT, dropboxOauthRedirect)
    app.get(URL.FACEBOOK.OAUTH2.REDIRECT, facebookOauthRedirect)
    
}

class Api {

    addRoutes = addRoutes

}

export default new Api()