import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
const H24INSEC = 86400 // 24 * 60 * 60

export const TEMP_SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

export interface ITokenData {
    id: string
    email: string
}

export interface IToken {
    id: string
    email: string
    iat: number
    exp: number
}

export const hasAuthorization = (req: Request): string | null => {

  const authorization = (
    req.cookies['authorization'] ||
    req.query['authorization'] || 
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
  ) as string

  if (!authorization) {
    return null
  }

  return authorization
}


export const validateAuthorisation = async (authorization: string): Promise<null|IToken> => {
  return new Promise(function(resolve,reject) {
    jwt.verify(authorization, TEMP_SECRET as string, (err: any, jwt: IToken) => {
      if (err != null) {
        return reject(err)
      }
      return resolve(jwt)
    })
  })
}

interface IHashPair {
  salt: string
  password_hash: string
}

let hashPassword = (password: string, salt: string): IHashPair => {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt: salt,
      password_hash: value
  };
};


class Authorization {
  create = (data: ITokenData) => {
    return jwt.sign(data, TEMP_SECRET, { expiresIn: `${H24INSEC}s` });
  }
  hashPassword = hashPassword
}


export default new Authorization()