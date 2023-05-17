

export enum ERROR_CODE  {
    USER_REGISTERED = 'USER_REGISTERED',
    USER_OR_PASSWORD_INVALID = 'USER_OR_PASSWORD_INVALID'
}

export const ERROR_USER_REGISTERED = {
    code: ERROR_CODE.USER_REGISTERED,
    message: 'User already registered'
}

export const ERROR_USER_OR_PASSWORD_INVALID = {
    code: ERROR_CODE.USER_OR_PASSWORD_INVALID,
    message: 'User or password invalid'
}