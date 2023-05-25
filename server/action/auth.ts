import {Request, Response} from 'express'
import UserModel from '../model/user'
import type {user as IUser} from '@prisma/client'
import {v4} from 'uuid'
import crypto from 'crypto'
import Authorization from '../module/authorization/authorization'
import Respond from '../respond/respond'
import Constroller from '../controller/constroller'
import {POSITION} from '../const/const'

const requestToUser = (req: Request) : IUser => {
    const salt = crypto.randomBytes(16).toString('base64')
    const hashed = Authorization.hashPassword(req.body.password, salt)
    return {
        id: v4(),
        created_at: new Date(),
        email: req.body.email,
        phone: '',
        name: '',
        given_name: '',
        family_name: '',
        locale: '',
        ...hashed,
    }
}

export const Signup = async (req: Request, res: Response) => {

    const userInDb = await UserModel.findUniqueEmail(req.body.email)
    if (userInDb) return Respond.Fail.UserAlreadyRegistered(res)

    const userData = requestToUser(req)
    const result = await Constroller.User.CreateWithOrganisation(userData, POSITION.OWNER)

    if (!result.success) return Respond.Fail.UserNotCreated(res)
    
    const authorization = Authorization.create({
        id: result.User.id,
        email: result.User.email
    })

    return Respond.Success.Login(res, authorization)
}

export const Login = async (req: Request, res: Response) => {

    let User = await UserModel.findUniqueEmail(req.body.email)
    if (!User) return Respond.Fail.UserNotCreated(res)
    if (User.password_hash != Authorization.hashPassword(req.body.password, User.salt).password_hash) return Respond.Fail.UserNotCreated(res)

    const authorization = Authorization.create({
        id: User.id,
        email: User.email
    })

    return Respond.Success.Login(res, authorization)

}


export const Logout = async (req: Request, res: Response) => {

    return res.redirect('/Login')
}


class AuthAction {
    Signup = Signup
    Login = Login
    Logout = Logout
}

export default new AuthAction()