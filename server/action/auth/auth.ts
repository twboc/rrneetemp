import {Request, Response} from 'express'
import UserModel from '../../model/user'
import Respond from '../../respond/respond'
import Constroller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { checkPassword, getAuthorization, requestToUser } from './auth.util'

export const Signup = async (req: Request, res: Response) => {

    const userInDb = await UserModel.findUniqueEmail(req.body.email)
    if (userInDb) return Respond.Auth.Signup.Fail.UserAlreadyRegistered(res)

    const result = await Constroller.User.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)

    if (!result.success) return Respond.Auth.Signup.Fail.Default(res)
    
    return Respond.Auth.Signup.Success(res, getAuthorization(result.User))
}


export const Login = async (req: Request, res: Response) => {

    let User = await UserModel.findUniqueEmail(req.body.email)
    if (!User) return Respond.Auth.Login.Fail.Default(res)
    if (!checkPassword(req.body.password, User.salt, User.password_hash)) return Respond.Auth.Login.Fail.Default(res)

    return Respond.Auth.Login.Success(res, getAuthorization(User))

}

export const Logout = async (req: Request, res: Response) => res.redirect('/login')

class AuthAction {
    Signup = Signup
    Login = Login
    Logout = Logout
}

export default new AuthAction()