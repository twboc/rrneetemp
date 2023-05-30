import { Request, Response, NextFunction } from 'express'
import { hasAuthorization, validateAuthorisation } from '../module/authorization/authorization'
import respond from '../respond/respond'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = hasAuthorization(req)
  if (authorization == null) return res.sendStatus(401)
  const isValid = await validateAuthorisation(authorization)
  return isValid ? next() : res.sendStatus(403)    
}

export const authApi = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = hasAuthorization(req)
  // console.log("authorization: ", authorization)
  if (authorization == null) return respond.api.auth.fail.authorisationMissing(res)
  const isValid = await validateAuthorisation(authorization)
  // console.log("isValid: ", isValid)
  return isValid ? next() : respond.api.auth.fail.authorisationInvalid(res)
}