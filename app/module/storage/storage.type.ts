export interface IStoreHandler {
    set: (key: string, value: any) => boolean
    get: (key: string) => boolean
    remove: (key: string) => boolean
    clearAll: () => boolean
}
