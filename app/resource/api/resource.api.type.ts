import { NetworkResponse } from '../../network/network.type'

export interface IRes<T> {
    meta: NetworkResponse<T>
    success: boolean
    error: {
        code: string
        message: string
    }
    data: T
}
