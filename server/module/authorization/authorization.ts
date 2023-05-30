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

export const hasAuthorization = (req: Request): string | null => {

  const authorization = getAuthorization(req)

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

export const hashPassword = (password: string, salt: string): IHashPair => {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt: salt,
      password_hash: value
  }
}

export const create = (data: ITokenData) => jwt.sign(data, TEMP_SECRET, { expiresIn: `${H24INSEC}s` })


class Authorization {
  hasAuthorization = hasAuthorization
  validateAuthorisation = validateAuthorisation
  hashPassword = hashPassword
  create = create
}


export default new Authorization()