import {Request, Response} from 'express'
import axios from 'axios'
import dropboxOauth2 from '../../config/dropboxOAuth2.json'
// import jwt from 'jsonwebtoken'
// import {v4} from 'uuid'
// import {user} from '../model/user'

interface DropboxToken {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  uid: string
  account_id: string
}

export const dropboxOauthRedirect = async (req: Request, res: Response) => {
  //   console.log('req: ', req)
  //@ts-ignore
  console.log('req.query.code: ', req.query.code)

  let url = `https://www.dropbox.com/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${dropboxOauth2.redirect_uri}`

  const tokenRes = await axios({
    url,
    method: 'post',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${dropboxOauth2.client_id}:${dropboxOauth2.client_secret}`,
        ).toString('base64'),
    },
  }).catch(err => {
    console.log('err: ', err)
    return res.redirect('/Login?error')
  })

  //@ts-ignore
  console.log('getToken: ', tokenRes.data)

  return res.redirect('/App')
}
