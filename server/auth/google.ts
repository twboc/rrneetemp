import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import {GoogleIdToken} from './google.type'
import {user} from '../model/user'
import google from '../resource/google/google'

export const googleOauthRedirect = async (req: Request, res: Response) => {
  const tokens = await google.apis.oauth.token({
    code: req.query.code as string,
  })

  if (!tokens.success) {
    return res.redirect('/Login?error=GAOA_ERROR')
  }

  const google_id = jwt.decode(tokens.data.id_token) as GoogleIdToken

  /////////////////////////////////////////////////////////////////////////////////
  // how to get google user with id token and access token
  // const googleuser = await getGoogleUser(id_token, access_token).catch(e => {
  //   console.log('googleuser ERRRRR: ', e)
  // })
  // console.log('googleuser: ', googleuser)
  /////////////////////////////////////////////////////////////////////////////////

  if (!(await user.findUniqueEmail(google_id.email))) {
    await user
      .create({
        id: v4(),
        created_at: new Date(),
        email: google_id.email,
        phone: '555555555',
        name: google_id.name,
        given_name: google_id.given_name,
        family_name: google_id.family_name,
        locale: google_id.locale,
      })
      .catch(() => {
        return res.redirect('/Login?error=UIDB_ERROR')
      })
  }

  // create session

  // set cookies

  return res.redirect('/App')
}
