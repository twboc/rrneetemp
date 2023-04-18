import {Request, Response} from 'express'
import axios from 'axios'
import qs from 'qs'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import {GoogleIdToken} from './google.type'
import {getGoogleOAuthParams} from './google.util'
import {user} from '../model/user'

const getGoogleOAuthTokens = async ({code}: {code: string}) => {
  const params = getGoogleOAuthParams(code)
  try {
    const res = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify(params),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return res.data
  } catch (e) {
    console.log('fail')
    console.error('failed to fetch google oauth tokens: ', e)
    console.log(e.response.data)
  }
}

const getGoogleUser = async (id_token: string, access_token: string) => {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    },
  )

  return res.data
}

export const googleOauthRedirect = async (req: Request, res: Response) => {
  // get id and access token with the code
  const code = req.query.code as string

  const tokens = await getGoogleOAuthTokens({
    code,
  }).catch(e => {
    return res.redirect('/Login')
  })

  const google_id = jwt.decode(tokens.id_token) as GoogleIdToken

  /////////////////////////////////////////////////////////////////////////////
  // how to get google user with id token and access token
  // const googleuser = await getGoogleUser(id_token, access_token).catch(e => {
  //   console.log('googleuser ERRRRR: ', e)
  // })
  // console.log('googleuser: ', googleuser)
  /////////////////////////////////////////////////////////////////////////////

  const user_db = await user.findUniqueEmail(google_id.email)

  if (!user_db) {
    const id = v4()
    await user
      .create({
        id,
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

  return res.redirect('/')
}
