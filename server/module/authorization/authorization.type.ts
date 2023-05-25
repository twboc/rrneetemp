export interface ITokenData {
    id: string
    email: string
}

export interface IToken {
    id: string
    email: string
    iat: number
    exp: number
}

export interface IHashPair {
  salt: string
  password_hash: string
}