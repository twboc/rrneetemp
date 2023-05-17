import {Request, Response} from 'express'
import {user} from '../model/user'
import {v4} from 'uuid'
import { ERROR_USER_REGISTERED, ERROR_USER_OR_PASSWORD_INVALID } from '../../shared/error/error'
import crypto from 'crypto'
import { create } from '../module/auth'

interface IHashPair {
    salt: string
    password_hash: string
}

let hasher = (password: string, salt: string): IHashPair => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        password_hash: value
    };
};

export const signup = async (req: Request, res: Response) => {

    let User = await user.findUniqueEmail(req.body.email)

    if (User) {
        return res.json({
            success: false,
            error: ERROR_USER_REGISTERED,
        })
    }

    const salt = crypto.randomBytes(16).toString('base64')

    console.log("salt: ", salt)
    console.log("hasher: ", hasher(req.body.password, salt))
  
    const hashed = hasher(req.body.password, salt)
    await user
        .create({
            id: v4(),
            created_at: new Date(),
            email: req.body.email,
            phone: '',
            name: '',
            given_name: '',
            family_name: '',
            locale: '',
            ...hashed,
        }).then((user_insert) => {
            User = user_insert
        })
        .catch((e) => {
            console.log("Error: ", e)
        })


        if (!User) {
            return res.json({
                success: false,
                error: {
                    code: 'USER_NOT_CREATED',
                    message: 'user was not created'
                },
            })
        }

    const token = create({
        //@ts-ignore
        id: User.id,
        //@ts-ignore
        email: User.email
    })

    console.log("TOKEN: ", token)

    return res.json({
        success: true,
        error: null,
        data: {
            token
        }
    })
}

export const login = async (req: Request, res: Response) => {

    let User = await user.findUniqueEmail(req.body.email)

    if (!User) {
        return res.json({
            success: false,
            error: ERROR_USER_OR_PASSWORD_INVALID,
        })
    }

    const hashed = hasher(req.body.password, User.salt)

    if (User.password_hash != hashed.password_hash) {
        return res.json({
            success: false,
            error: ERROR_USER_OR_PASSWORD_INVALID,
        })
    }

    return res.json({
        success: true,
        error: null,
    })
}


export const logout = async (req: Request, res: Response) => {

    return res.redirect('/Login')
}