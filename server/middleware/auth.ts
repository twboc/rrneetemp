import { Request, Response, NextFunction } from 'express'
import respond from '../respond/respond'
import authorizationModule from '../module/authorization/authorization'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = authorizationModule.exists(req)
  if (authorization == null) return res.sendStatus(401)
  const isValid = await authorizationModule.validate(authorization)
  return isValid ? next() : res.sendStatus(403)    
}

export const authApi = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = authorizationModule.exists(req)
  if (authorization == null) return respond.api.auth.fail.authorisationMissing(res)
  const isValid = await authorizationModule.validate(authorization)
  return isValid ? next() : respond.api.auth.fail.authorisationInvalid(res)
}