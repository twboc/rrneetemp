import { Request, Response, NextFunction } from 'express'
import { hasAuthorization, validateAuthorisation } from '../module/authorization'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = hasAuthorization(req)
  console.log("AUTH authorization: ", authorization)
  if (authorization == null) {
    return res.sendStatus(401)
  }
  const isValid = await validateAuthorisation(authorization)
  console.log("AUTH isValid: ", isValid)
  return isValid ? next() : res.sendStatus(403)    
}

