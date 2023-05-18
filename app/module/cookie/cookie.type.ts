export interface ICookieHandler {
    set: (key: string, value: any) => string | undefined
    get: (key: string) => string | undefined
    remove: (key: string) => void
}
