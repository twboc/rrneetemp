import {getGoogleOAuthParams} from '../../provider/google.util'
import {POSTFORM} from './google.method'
import {OAuthGoogleApisResponse, TokenReq, TokenRes} from './google.type'

const token = async (req: TokenReq) => {
  const params = getGoogleOAuthParams(req.code)
  return POSTFORM<{}, OAuthGoogleApisResponse<TokenRes>>('/token', null, {
    params,
  })
}
  

const google = {
  apis: {
    oauth: {
      token,
    },
  },
}

export {token}

export default google

// const getGoogleUser = async (id_token: string, access_token: string) => {
//   const res = await axios.get(
//     `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//     {
//       headers: {
//         Authorization: `Bearer ${id_token}`,
//       },
//     },
//   )

//   return res
// }
