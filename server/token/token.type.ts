export interface GoogleIdToken {
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
  

  export interface DropboxToken {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
    uid: string
    account_id: string
  }
  