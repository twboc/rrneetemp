import {Request, Response} from 'express'
import { DropboxToken } from '../token/token.type'
import dropbox from '../resource/dropbox/dropbox'

export const dropboxOauthRedirect = async (req: Request, res: Response) => {

  const tokenRes = await dropbox.apis.oauth.token(req.query.code as string)
    .catch(err => {
      console.log('err: ', err)
      return res.redirect('/Login?error')
    })

  //@ts-ignore
  const token = tokenRes.data as DropboxToken
  
  //@ts-ignore
  console.log('token: ', token)

  return res.redirect('/App')
}
