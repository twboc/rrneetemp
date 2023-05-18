import { IStoreHandler } from './storage.type'

export default class Storage {
    handler: IStoreHandler
    constructor(handler: IStoreHandler){
        this.handler = handler
    }

    set = async (key: string, value: any): Promise<boolean> => this.handler.set(key, value)
    get = async (key: string): Promise<boolean> => this.handler.get(key)
    remove = async (key: string): Promise<boolean> => this.handler.remove(key)
    clearAll = async (): Promise<boolean> => this.handler.clearAll()

}