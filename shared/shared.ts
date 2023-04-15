import googleOAuth2 from '../config/googleOAuth2.json'

export const googleOauth2URL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: googleOAuth2.redirect_uris[2],
    client_id: googleOAuth2.client_id,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  console.log({qs})

  return `${rootURL}?${qs.toString()}`
}
