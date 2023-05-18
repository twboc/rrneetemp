// import store from 'store'
import cookie from 'js-cookie'
import Cookie from './cookie.class'

const _Cookie = new Cookie({
    set: (key, value) => cookie.set(key, value),
    get: (key) => {

        const value = cookie.get(key)
        return value
    },
    remove: (key: string) => cookie.remove(key)
})


export default _Cookie
