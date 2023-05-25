import {Request} from 'express'
import type {user as IUser} from '@prisma/client'
import {v4} from 'uuid'
import crypto from 'crypto'
import Authorization from '../../module/authorization/authorization'

export const checkPassword = (password: string, salt: string, password_hash: string) => Authorization.hashPassword(password, salt).password_hash == password_hash

export const getAuthorization = (user: IUser) => Authorization.create({
    id: user.id,
    email: user.email
})

export const requestToUser = (req: Request) : IUser => {
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
