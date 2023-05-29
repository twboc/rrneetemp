import { Response} from 'express'
import {
    ERROR_USER_REGISTERED,
    ERROR_USER_NOT_CREATED,
    ERROR_USER_OR_PASSWORD_INVALID,
    ERROR_AUTHORIZATION_MISSING,
    ERROR_AUTHORIZATION_INVALID,
    ERROR_USER_ORGANISATION_FAILED,
    ERROR_ORGANISATION_UPDATE_NAME_FAILED,
    ERROR_ALREADY_OWNER_OR_MEMBER
} from '../../shared/error/error'

import type {user as IUser, user_organisation as IUserOrganisation} from '@prisma/client'

interface ISuccessPartial {
    success: true
    error: null
}

const SUCCESS: ISuccessPartial = {
    success: true,
    error: null
}

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
    error: ERROR_USER_NOT_CREATED,
})

const UserOrPasswordInvalid = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_OR_PASSWORD_INVALID,
})

const Login = (res: Response, authorization: string) => res.json({
    ...SUCCESS,
    data: {
        authorization
    }
})


const UserInitSuccess = (res: Response, data: any) => res.json({
    ...SUCCESS,
    data
})

const UserOrganisationQuery = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_ORGANISATION_FAILED
})

const OrganisationChangeNameSuccess = (res: Response, name: string) => res.json({
    ...SUCCESS,
    data: {
        name
    }
})

const OrganisationChangeNameFail = (res: Response) => res.json({
    success: false,
    error: ERROR_ORGANISATION_UPDATE_NAME_FAILED
})

const AuthUserAddSuccess = (res: Response, data: { user: Omit<IUser, 'salt' | 'password_hash'>, user_organisation: IUserOrganisation}) => res.json({
    ...SUCCESS,
    data
})

const AlreadyAOwnerOrMember = (res: Response) => res.json({
    success: false,
    error: ERROR_ALREADY_OWNER_OR_MEMBER
})


const Respond = {
    Auth: {
        Login: {
            Success: Login,
            Fail: {
                Default: UserNotCreated,
                UserAlreadyRegistered,
                UserOrPasswordInvalid
            }
        },
        Signup: {
            Success: Login,
            Fail: {
                Default: UserNotCreated,
                UserAlreadyRegistered
            }
        },
        UserAdd: {
            Success: AuthUserAddSuccess,
            Fail: {
                Default: UserNotCreated,
                AlreadyAOwnerOrMember
            }
        }
    },
    User: {
        Init: {
            Success: UserInitSuccess,
            Fail: {
                Default: UserNotCreated,
                UserOrganisationQuery
            }
        }
    },
    Organisation: {
        ChangeName: {
            Success: OrganisationChangeNameSuccess,
            Fail: OrganisationChangeNameFail
        }
    },
    API: {
        Auth: {
            Fail: {
                AuthorisationMissing,
                AuthorisationInvalid
            },
        }
    }  
} 


export default Respond