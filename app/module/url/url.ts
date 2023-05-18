import Storage from '../storage/storage'
import { CONST_KEYS } from '../../const/const'

class Url {
    changePath = async (path: string, params?: any) => {
        const paramsString = new URLSearchParams(params).toString()
        if (params) {
            path = path + `?${paramsString}`
        }
        console.log("path: ", path)
        window.location.href = path
    }
    changePathWithAuth = async (path: string, params?: any) => {
        const token = await Storage.get(CONST_KEYS.authorization)
        await this.changePath(path, { [CONST_KEYS.authorization]: token, ...params})
    }
}

const _Url = new Url()

export default _Url