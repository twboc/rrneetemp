import { Request, Response, NextFunction } from 'express'
import { hasAuthorization, validateAuthorisation } from '../module/authorization/authorization'
import Respond from '../respond/respond'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = hasAuthorization(req)
  if (authorization == null) return res.sendStatus(401)
  const isValid = await validateAuthorisation(authorization)
  return isValid ? next() : res.sendStatus(403)    
}

export const authApi = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = hasAuthorization(req)
  console.log("API AUTH authorization: ", authorization)
  if (authorization == null) return Respond.Fail.AuthorisationMissing(res)
  const isValid = await validateAuthorisation(authorization)
  console.log("API AUTH isValid: ", isValid)
  return isValid ? next() : Respond.Fail.AuthorisationInvalid(res)
}