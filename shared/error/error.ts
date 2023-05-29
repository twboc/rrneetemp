

export enum ERROR_CODE  {
    USER_REGISTERED = 'USER_REGISTERED',
    USER_OR_PASSWORD_INVALID = 'USER_OR_PASSWORD_INVALID',
    USER_NOT_CREATED = 'USER_NOT_CREATED',
    AUTHORIZATION_MISSING = 'AUTHORIZATION_MISSING',
    AUTHORIZATION_INVALID = 'AUTHORIZATION_INVALID',
    USER_ORGANISATION_QUERY_FAILED = 'USER_ORGANISATION_QUERY_FAILED',
    ORGANISATION_UPDATE_NAME_FAILED = 'ORGANISATION_UPDATE_NAME_FAILED',
    ALREADY_OWNER_OR_MEMBER = 'ALREADY_OWNER_OR_MEMBER'
}

export const ERROR_USER_REGISTERED = {
    code: ERROR_CODE.USER_REGISTERED,
    message: 'User already registered'
}

export const ERROR_USER_OR_PASSWORD_INVALID = {
    code: ERROR_CODE.USER_OR_PASSWORD_INVALID,
    message: 'User or password invalid'
}

export const ERROR_USER_NOT_CREATED = {
    code: ERROR_CODE.USER_NOT_CREATED,
    message: 'User was not created'
}

export const ERROR_AUTHORIZATION_MISSING = {
    code: ERROR_CODE.AUTHORIZATION_MISSING,
    message: 'Authorization missing'
}

export const ERROR_AUTHORIZATION_INVALID = {
    code: ERROR_CODE.AUTHORIZATION_INVALID,
    message: 'Authorization Invalid'
}

export const ERROR_USER_ORGANISATION_FAILED = {
    code: ERROR_CODE.USER_ORGANISATION_QUERY_FAILED,
    message: 'User Organisation query failed'
}

export const ERROR_ORGANISATION_UPDATE_NAME_FAILED = {
    code: ERROR_CODE.ORGANISATION_UPDATE_NAME_FAILED,
    message: 'Organisation update name failed'
}

export const ERROR_ALREADY_OWNER_OR_MEMBER = {
    code: ERROR_CODE.ALREADY_OWNER_OR_MEMBER,
    message: 'User already a owner or member in this organisation'
}