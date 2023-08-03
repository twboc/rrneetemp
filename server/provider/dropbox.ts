import {Request, Response} from 'express'
import { DropboxToken } from '../token/token.type'
import dropbox from '../resource/dropbox/dropbox'

export const dropboxOauthRedirect = async (req: Request, res: Response) => {

  const tokenRes = await dropbox.apis.oauth.token(req.query.code as string)
    .catch(err => {
      return res.redirect('/login?error')
    })

  //@ts-ignore
  const token = tokenRes.data as DropboxToken

  return res.redirect('/app')
}
