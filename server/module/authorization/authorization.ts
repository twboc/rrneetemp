import { Request } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { ITokenData, IToken, IHashPair} from './authorization.type'
import {H24INSEC, TEMP_SECRET} from './authorization.const'

export const getAuthorization = (req: Request): string => {
  return (
    req.cookies['authorization'] ||
    req.query['authorization'] || 
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
  ) as string
}

export const exists = (req: Request): string | null => {
  const authorization = getAuthorization(req)
  return authorization
    ? authorization
    : null
}

interface AuthorisationSuccess {
  success: true,
  data: {
    token: IToken
  }
  error: null
}

interface AuthorisationFail {
  success: false,
  data: null,
  error: Error
}

export const validate = async (authorization: string): Promise<AuthorisationSuccess|AuthorisationFail> => {
  return new Promise(function(resolve,reject) {
    jwt.verify(authorization, TEMP_SECRET as string, (err: any, jwt: IToken) => {
      if (err != null) {
        return reject({
          success: false,
          data: null,
          error: err,
        })
      }
      return resolve({
        success: true,
        data: {
          token: jwt
        },
        error: null
      })
    })
  })
}

export const hashPassword = (password: string, salt: string): IHashPair => {
  return {
      salt: salt,
      password_hash: crypto.createHmac('sha512', salt).update(password).digest('hex')
  }
}

export const create = (data: ITokenData) => jwt.sign(data, TEMP_SECRET, { expiresIn: `${H24INSEC}s` })

export const token = async (req: Request) => await validate(exists(req))

class Authorization {
  exists = exists
  validate = validate
  hashPassword = hashPassword
  create = create
  token = token
}


export default new Authorization()