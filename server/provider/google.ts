import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import {GoogleToken, GoogleIdToken} from '../token/token.type'
import Model from '../model/model'
import {google_token_data} from '../model/google_token_data'
import {google_id_token} from '../model/google_id_token'
import google from '../resource/google/google'

export const googleOauthRedirect = async (req: Request, res: Response) => {
  
  console.log("here we are!!!")

  const tokens = await google.apis.oauth.token({
    code: req.query.code as string,
  })

  if (!tokens.success) {
    return res.redirect('/Login?error=GAOA_ERROR')
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
  let User = await Model.User.findUniqueEmail(idToken.email)

  if (!(User)) {

    console.log("CREATE NEW USER")
    await Model.User
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
      //   return res.redirect('/Login?error=UIDB_ERROR')
      // })
  }


  console.log("user: ", User)

  if (User){
    await google_token_data.create({...google_token, user_id: User.id })
    await google_id_token.create({ ...idToken, user_id: User.id })
  }
  

  // create session

  // set cookies

  return res.redirect('/App')
}