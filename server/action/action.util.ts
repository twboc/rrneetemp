import {Request} from 'express'
import type {user as IUser} from '@prisma/client'
import {v4} from 'uuid'
import crypto from 'crypto'
import authorization from '../module/authorization/authorization'

export const requestToUser = (req: Request) : IUser => {
    const salt = crypto.randomBytes(16).toString('base64')
    const hashed = authorization.hashPassword(req.body.password, salt)
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
