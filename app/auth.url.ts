import dropboxOauth2 from '../config/dropboxOAuth2.json'
import googleOAuth2 from '../config/googleOAuth2.json'
// import facebookOAuth2 from '../config/facebookOAuth2.json'

export const googleOauth2URL = () => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri: googleOAuth2.web.redirect_uris[0],
    client_id: googleOAuth2.web.client_id,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }

  if (!options.redirect_uri) {
    console.log("Missing redirect URI")
  }

  const qs = new URLSearchParams(options)
  
  return `${url}?${qs.toString()}`
}

export const dropboxOauth2URL = () => {
  const url = 'https://www.dropbox.com/oauth2/authorize'

  const options = {
    client_id: dropboxOauth2.client_id,
    response_type: dropboxOauth2.response_type,
    redirect_uri: dropboxOauth2.redirect_uri,
    access_token_type: 'offline',
    scope: [].join(' ')
  }

  const qs = new URLSearchParams(options)

  return `${url}?${qs.toString()}`
}

export const facebookOAuth2URL = () => {
  // const url = 'https://www.facebook.com/v16.0/dialog/oauth'

  // const options = {
  //   redirect_uri: facebookOAuth2.redirect_uris[2],
  //   client_id: facebookOAuth2.client_id,
  //   state: '{st=state123abc,ds=123456789}',
  // }

  // const qs = new URLSearchParams(options)

  return ''
  //  `${url}?${qs.toString()}`
}
