import { Response} from 'express'
import {
    ERROR_USER_REGISTERED,
    ERROR_USER_NOT_CREATED,
    ERROR_USER_OR_PASSWORD_INVALID,
    ERROR_AUTHORIZATION_MISSING,
    ERROR_AUTHORIZATION_INVALID,
    ERROR_USER_ORGANISATION_FAILED,
    ERROR_ORGANISATION_UPDATE_NAME_FAILED,
    ERROR_ALREADY_OWNER_OR_MEMBER,
    ERROR_USER_NOT_REMOVED_FROM_ORGANISATION
} from '../../shared/error/error'
import type { IUser, IUserOrganisation, ITrackerDomain, ITrackerQueryWithVariants, ITrackerDomainStats } from '../../shared/type/type'

interface ISuccessPartial {
    success: true
    error: null
}

const SUCCESS: ISuccessPartial = {
    success: true,
    error: null
}

const authorisationMissing = (res: Response) => res.json({
    success: false,
    error: ERROR_AUTHORIZATION_MISSING,
})

const authorisationInvalid = (res: Response) => res.json({
    success: false,
    error: ERROR_AUTHORIZATION_INVALID,
})

const userAlreadyRegistered = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_REGISTERED,
})

const userNotCreated = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_NOT_CREATED,
})

const userOrPasswordInvalid = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_OR_PASSWORD_INVALID,
})

const login = (res: Response, authorization: string) => res.json({
    ...SUCCESS,
    data: {
        authorization
    }
})


const userInitSuccess = (res: Response, data: any) => res.json({
    ...SUCCESS,
    data
})

const userOrganisationQuery = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_ORGANISATION_FAILED
})

const organisationChangeNameSuccess = (res: Response, name: string) => res.json({
    ...SUCCESS,
    data: {
        name
    }
})

const organisationChangeNameFail = (res: Response) => res.json({
    success: false,
    error: ERROR_ORGANISATION_UPDATE_NAME_FAILED
})

const authUserAddSuccess = (res: Response, data: { user: Omit<IUser, 'salt' | 'password_hash'>, user_organisation: IUserOrganisation}) => res.json({
    ...SUCCESS,
    data
})

const alreadyAOwnerOrMember = (res: Response) => res.json({
    success: false,
    error: ERROR_ALREADY_OWNER_OR_MEMBER
})

const userDeleteSuccess = (res: Response) => res.json({
    ...SUCCESS,
    data: {}
})

const userDeleteFail = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_NOT_REMOVED_FROM_ORGANISATION
})

const userDeleteNoPermissions = (res: Response) => res.json({
    success: false,
    error: ERROR_USER_NOT_REMOVED_FROM_ORGANISATION
})

const userGetSuccess = (res: Response, user_organisation: any) => res.json({
    ...SUCCESS,
    data: {
        user_organisation
    }
})

const trackerDomainCreateSuccess = (res: Response, data: ITrackerDomain) => res.json({
    ...SUCCESS,
    data
})

const trackerDomainGetAllSuccess = (res: Response, data: ITrackerDomain) => res.json({
    ...SUCCESS,
    data
})

const trackerDomainGetStatsSuccess = (res: Response, data: ITrackerDomainStats) => res.json({
    ...SUCCESS,
    data
})

const trackerQueryCreateSuccess = (res: Response, data: ITrackerQueryWithVariants[]) => res.json({
    ...SUCCESS,
    data
})

const Respond = {
    auth: {
        login: {
            success: login,
            fail: {
                default: userNotCreated,
                userAlreadyRegistered,
                userOrPasswordInvalid
            }
        },
        signup: {
            success: login,
            fail: {
                default: userNotCreated,
                userAlreadyRegistered
            }
        },
        
    },
    user: {
        init: {
            success: userInitSuccess,
            fail: {
                default: authorisationInvalid,
                userOrganisationQuery
            }
        }
    },
    organisation: {
        name: {
            update: {
                success: organisationChangeNameSuccess,
                fail: organisationChangeNameFail
            }
        },
        user: {
            add: {
                success: authUserAddSuccess,
                fail: {
                    default: userNotCreated,
                    alreadyAOwnerOrMember
                }
            },
            get: {
                success: userGetSuccess
            },
            delete: {
                success: userDeleteSuccess,
                fail: {
                    default: userDeleteFail,
                    userDeleteNoPermissions
                }
            }
        }
    },
    api: {
        auth: {
            fail: {
                authorisationMissing,
                authorisationInvalid
            },
        }
    },
    tracker: {
        domain: {
            create: {
                success: trackerDomainCreateSuccess,
                fail: {}
            },
            get: {
                all: {
                    success: trackerDomainGetAllSuccess
                },
                stats: {
                    success: trackerDomainGetStatsSuccess
                }
            }
        },
        query: {
            create: {
                success: trackerQueryCreateSuccess
            }
        }
    }
} 


export default Respond