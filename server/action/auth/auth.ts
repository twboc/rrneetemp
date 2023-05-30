import {Request, Response} from 'express'
import UserModel from '../../model/user'
import respond from '../../respond/respond'
import Constroller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { checkPassword, getAuthorization } from './auth.util'
import { requestToUser } from '../action.util'

export const signup = async (req: Request, res: Response) => {
    const user = await UserModel.findUniqueEmail(req.body.email)
    if (user) return respond.auth.signup.fail.userAlreadyRegistered(res)
    const result = await Constroller.User.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)
    if (!result.success) return respond.auth.signup.fail.default(res)
    return respond.auth.signup.success(res, getAuthorization(result.data.User))
}

export const login = async (req: Request, res: Response) => {
    let User = await UserModel.findUniqueEmail(req.body.email)
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