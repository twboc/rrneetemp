import {Request, Response} from 'express'
import UserModel from '../model/user'
import type {user as IUser} from '@prisma/client'
import {v4} from 'uuid'
import crypto from 'crypto'
import Authorization from '../module/authorization'
import Respond from '../respond/respond'
import Constroller from '../controller/constroller'

const requestToUser = async (req: Request) : Promise<IUser> => {
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

export const signup = async (req: Request, res: Response) => {

    const userInDb = await UserModel.findUniqueEmail(req.body.email)
    if (userInDb) return Respond.Fail.UserAlreadyRegistered(res)

    const userData = await requestToUser(req)
    const result = await Constroller.User.CreateWithOrganisation(userData)

    if (!result.success) return Respond.Fail.UserNotCreated(res)
    
    const authorization = Authorization.create({
        //@ts-ignore
        id: result.User.id,
        //@ts-ignore
        email: result.User.email
    })

    return Respond.Success.Login(res, authorization)
}

export const login = async (req: Request, res: Response) => {

    let User = await UserModel.findUniqueEmail(req.body.email)
    if (!User) return Respond.Fail.UserNotCreated(res)
    if (User.password_hash != Authorization.hashPassword(req.body.password, User.salt).password_hash) return Respond.Fail.UserNotCreated(res)

    const authorization = Authorization.create({
        id: User.id,
        email: User.email
    })

    return Respond.Success.Login(res, authorization)

}


export const logout = async (req: Request, res: Response) => {

    return res.redirect('/Login')
}