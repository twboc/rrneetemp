import {Request, Response} from 'express'

export const facebookOauthRedirect = async (req: Request, res: Response) => {
  res.redirect('/')
}
