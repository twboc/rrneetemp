import googleOAuth2 from '../../config/googleOAuth2.json'

export const getGoogleOAuthParams = (code: string) => {

  const params = {
    code: code,
    client_id: googleOAuth2.web.client_id,
    client_secret: googleOAuth2.web.client_secret,
    redirect_uri: googleOAuth2.web.redirect_uris[0],
    grant_type: 'authorization_code',
  }

  if (!params.redirect_uri) { console.error("Missing redirect_uri")}

  return params
}
