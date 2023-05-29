import {Request, Response} from 'express'
import UserModel from '../../model/user'
import Respond from '../../respond/respond'
import Constroller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { checkPassword, getAuthorization } from './auth.util'
import { requestToUser } from '../action.util'

export const signup = async (req: Request, res: Response) => {
    const user = await UserModel.findUniqueEmail(req.body.email)
    if (user) return Respond.Auth.Signup.Fail.UserAlreadyRegistered(res)
    const result = await Constroller.User.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)
    if (!result.success) return Respond.Auth.Signup.Fail.Default(res)
    return Respond.Auth.Signup.Success(res, getAuthorization(result.data.User))
}

export const login = async (req: Request, res: Response) => {
    let User = await UserModel.findUniqueEmail(req.body.email)
    if (!User) return Respond.Auth.Login.Fail.Default(res)
    if (!checkPassword(req.body.password, User.salt, User.password_hash)) return Respond.Auth.Login.Fail.Default(res)
    return Respond.Auth.Login.Success(res, getAuthorization(User))
}

export const logout = async (req: Request, res: Response) => res.redirect('/login')

class AuthAction {
    signup = signup
    login = login
    logout = logout
}

export default new AuthAction()