import googleOAuth2 from '../../config/googleOAuth2.json'

export const getGoogleOAuthParams = (code: string) => ({
  code: code,
  client_id: googleOAuth2.client_id,
  client_secret: googleOAuth2.client_secret,
  redirect_uri: googleOAuth2.redirect_uris[2],
  grant_type: 'authorization_code',
})
