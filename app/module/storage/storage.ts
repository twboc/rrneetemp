import store from 'store'
import Storage from './storage.class'

const _Storage = new Storage({
    set: (key, value) => store.set(key, value),
    get: (key) => {
        const value = store.get(key)
        return value
    },
    remove: (key) => {
        store.remove(key)
        if (store.get(key)) {
            console.log(`Key ${key} was not deleted`)
            return false
        }
        return true
    },
    clearAll: () => {
        store.clearAll()
        return true
    }
})


export default _Storage
