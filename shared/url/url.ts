
const AUTH = {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout'
}

const USER = {
    INIT: '/api/user/init'
}

const ORGANISATION = {
    NAME: {
        GET: '/api/organisation/name'
    },
    USER: {
        GET: '/api/organisation/user/',
        ADD: '/api/organisation/user/add',
        DELETE: '/api/organisation/user/delete'
    }
}

const TRACKER = {
    DOMAIN: {
        CREATE: 'api/tracker/domain/create'
    }
}

const GOOGLE = {
    OAUTH2: {
        REDIRECT: '/api/google/ouath2/redirect'
    }
}

const DROPBOX = {
    OAUTH2: {
        REDIRECT: '/api/dropbox/ouath2/redirect'
    }
}

const FACEBOOK = {
    OAUTH2: {
        REDIRECT: '/api/facebook/ouath2/redirect'
    }
}

const URL = {
    AUTH,
    USER,
    ORGANISATION,
    TRACKER,
    GOOGLE,
    DROPBOX,
    FACEBOOK
}

export default URL