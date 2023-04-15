import {Request, Response} from 'express'
import axios from 'axios'
import qs from 'qs'
import jwt from 'jsonwebtoken'
import googleOAuth2 from '../../config/googleOAuth2.json'

interface GoogleToken {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  locale: string
  iat: number
  exp: number
}

const googleTokenUrl = 'https://oauth2.googleapis.com/token'

const getGoogleOauthTokens = async ({code, res}: {code: string; res: any}) => {
  //   res.sendFile(path.resolve(__dirname + '/../public/index.html'))
  console.log('code: ', code)

  const value = {
    code: code,
    client_id: googleOAuth2.client_id,
    client_secret: googleOAuth2.client_secret,
    redirect_uri: googleOAuth2.redirect_uris[2],
    grant_type: 'authorization_code',
  }

  console.log('VALUE: ', qs.stringify(value))

  try {
    const res = await axios.post(googleTokenUrl, qs.stringify(value), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return res.data
  } catch (e) {
    console.log('fail')
    console.error('failed to fetch google oauth tokens: ', e)
    console.log(e.response.data)
  }
}

const getGoogleUser = async (id_token: string, access_token: string) => {
  const res = await axios.get(
    `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    },
  )

  return res
}

export const googleOauthRedirect = async (req: Request, res: Response) => {
  //   console.log('req:', req)

  // get the code from qs

  // get id and access token with the code
  const code = req.query.code as string

  const {id_token, access_token} = await getGoogleOauthTokens({
    code,
    res,
  }).catch(e => {
    console.log('ERRRRR: ', e)
  })
  // console.log('id_token, access_token: ', id_token, access_token)

  const googleuser = jwt.decode(id_token)
  // const googleuser = getGoogleUser(id_token, access_token)

  console.log('googleuser: ', googleuser)

  res.redirect('/')

  // get the user with the tokens

  // insert user

  // create session

  // set cookies

  // redirect back to client
}
