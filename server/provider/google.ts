import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import {GoogleToken, GoogleIdToken} from '../token/token.type'
import model from '../model/model'
import {google_token_data} from '../model/google_token_data'
import {google_id_token} from '../model/google_id_token'
import google from '../resource/google/google'
import {CONST_KEYS} from '../../app/const/const'
import { getAuthorization } from '../action/auth/auth.util'

export const googleOauthRedirect = async (req: Request, res: Response) => {
  
  console.log("here we are!!!")

  const tokens = await google.apis.oauth.token({
    code: req.query.code as string,
  })

  if (!tokens.success) {
    return res.redirect('/login?error=GAOA_ERROR')
  }

  const google_token = tokens.data as GoogleToken

  console.log("token res: ", tokens.data)

  const idToken = jwt.decode(tokens.data.id_token) as GoogleIdToken

  console.log("idToken: ", idToken)

  /////////////////////////////////////////////////////////////////////////////////
  // how to get google user with id token and access token
  // const googleuser = await getGoogleUser(id_token, access_token).catch(e => {
  //   console.log('googleuser ERRRRR: ', e)
  // })
  // console.log('googleuser: ', googleuser)
  /////////////////////////////////////////////////////////////////////////////////
  let User = await model.user.findUniqueEmail(idToken.email)

  if (!(User)) {

    console.log("CREATE NEW USER")
    await model.user
      .create({
        id: v4(),
        created_at: new Date(),
        email: idToken.email,
        phone: '',
        name: idToken.name,
        given_name: idToken.given_name,
        family_name: idToken.family_name,
        locale: idToken.locale,
        salt: '',
        password_hash: ''
      })
      
      // .then((user_insert) => {
      //   User = user_insert
      // })      
      // .catch(() => {
      //   return res.redirect('/login?error=UIDB_ERROR')
      // })
  }

  if (User){
    await google_token_data.create({...google_token, user_id: User.id })
    await google_id_token.create({ ...idToken, user_id: User.id })
  }
  
  // set cookies
  const authorization = getAuthorization(User)
  res.cookie(CONST_KEYS.authorization, authorization)

  return res.redirect('/login?google=success')
}
