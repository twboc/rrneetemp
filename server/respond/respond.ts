import { Response} from 'express'
import { ERROR_USER_REGISTERED, ERROR_USER_OR_PASSWORD_INVALID, ERROR_AUTHORIZATION_MISSING, ERROR_AUTHORIZATION_INVALID } from '../../shared/error/error'

const AuthorisationMissing = (res: Response) => res.json({
    success: false,
    error: ERROR_AUTHORIZATION_MISSING,
})

const AuthorisationInvalid = (res: Response) => res.json({
    success: false,
    error: ERROR_AUTHORIZATION_INVALID,
})



const UserAlreadyRegistered = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_REGISTERED,
})

const UserNotCreated = (res: Response) => res.json({
    success: false,
    error: {
        code: 'USER_NOT_CREATED',
        message: 'user was not created'
    },
})

const UserOrPasswordInvalid = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_OR_PASSWORD_INVALID,
})

const Login = (res: Response, authorization: string) => res.json({
    success: true,
    error: null,
    data: {
        authorization
    }
})

const Respond = {
    Fail: {
        UserAlreadyRegistered,
        UserNotCreated,
        UserOrPasswordInvalid,
        AuthorisationMissing,
        AuthorisationInvalid
    },
    Success: {
        Login
    }
} 


export default Respond