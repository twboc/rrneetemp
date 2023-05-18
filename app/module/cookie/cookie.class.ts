import { ICookieHandler } from './cookie.type'

export default class Cookie {
    handler: ICookieHandler
    constructor(handler: ICookieHandler){
        this.handler = handler
    }
    set = async (key: string, value: any): Promise<string | undefined> => this.handler.set(key, value)
    get = async (key: string): Promise<string | undefined> => this.handler.get(key)
    remove = (key: string) => this.handler.remove(key)
}