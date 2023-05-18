// import Time from '../Time/Time'
// // import _SecureStorage, { SecureStorage } from '../Storage/Storage.Secure'
// // import { SecureStorageT } from '../Storage/Storage.type'
// import { TokenKey, TokenValue, Token } from './AuthToken.type'
// // import AuthTokenBase from './AuthToken.base'
// import { ID_TOKEN, UNDEFINED_TOKEN } from './AuthToken.const'

// // extends AuthTokenBase

// class AuthToken<T>  {
// 	private NativeHandler: SecureStorage<T>

// 	constructor(_secureStore: SecureStorage<T>) {
// 		// super()
// 		this.NativeHandler = _secureStore
// 	}

// 	public GetToken = async (key: TokenKey = ID_TOKEN): Promise<Token> => {
// 		return (await this.NativeHandler.Get(key)) ?? UNDEFINED_TOKEN
// 	}

// 	public SetToken = async (
// 		Token: TokenValue,
// 		key: TokenKey = ID_TOKEN
// 	): Promise<boolean> => {
// 		return await this.NativeHandler.SetConfirm(key, Token)
// 	}

// 	public RemoveToken = async (key: TokenKey = ID_TOKEN): Promise<boolean> => {
// 		return await this.NativeHandler.RemoveConfirm(key)
// 	}

// 	public IsValid = (Token: TokenValue) => {
// 		// return Token && this.JWTDecode(Token).exp > Time().unix()
// 	}
// }

// // export default new AuthToken<SecureStorageT>(_SecureStorage)
