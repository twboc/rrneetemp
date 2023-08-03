import { Request, Response, NextFunction } from 'express'
import respond from '../respond/respond'
import authorization from '../module/authorization/authorization'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = authorization.exists(req)
  if (bearer == null) return res.sendStatus(401)
  const isValid = await authorization.validate(bearer)
  return isValid ? next() : res.sendStatus(403)    
}

export const authApi = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = authorization.exists(req)
  if (bearer == null) return respond.api.auth.fail.authorisationMissing(res)
  const isValid = await authorization.validate(bearer)
  return isValid ? next() : respond.api.auth.fail.authorisationInvalid(res)
}