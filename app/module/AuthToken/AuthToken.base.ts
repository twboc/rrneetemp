// import { TokenValue, TokenShape } from './AuthToken.type'
// import { decode } from 'base-64'

// class AuthTokenBase {
// 	public JWTDecode = <T = TokenShape>(Token: TokenValue): T => {
// 		const base64Url = Token.split('.')[1]
// 		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
// 		const payload = decodeURIComponent(
// 			decode(base64)
// 				.split('')
// 				.map(
// 					(c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
// 				)
// 				.join('')
// 		)
// 		return JSON.parse(payload)
// 	}
// }

// export default AuthTokenBase
