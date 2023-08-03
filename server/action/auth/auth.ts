import {Request, Response} from 'express'
import model from '../../model/model'
import respond from '../../respond/respond'
import constroller from '../../controller/constroller'
import { checkPassword, getAuthorization } from './auth.util'
import { requestToUser } from '../action.util'

export const signup = async (req: Request, res: Response) => {
    const user = await model.user.findUniqueEmail(req.body.email)
    if (user) return respond.auth.signup.fail.userAlreadyRegistered(res)
    const result = await constroller.user.create(requestToUser(req))
    if (!result.success) return respond.auth.signup.fail.default(res)
    return respond.auth.signup.success(res, getAuthorization(result.data.User))
}

export const login = async (req: Request, res: Response) => {
    let User = await model.user.findUniqueEmail(req.body.email)
    if (!User) return respond.auth.login.fail.default(res)
    if (!checkPassword(req.body.password, User.salt, User.password_hash)) return respond.auth.login.fail.default(res)
    return respond.auth.login.success(res, getAuthorization(User))
}

export const logout = async (req: Request, res: Response) => res.redirect('/login')

class AuthAction {
    signup = signup
    login = login
    logout = logout
}

export default new AuthAction()