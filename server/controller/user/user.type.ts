import type { IUser, IOrganisation, IUserOrganisation } from '../../../shared/type/type'

export interface IUserCreateSuccess {
    success: true
    data: {
        User: IUser
        Organisation: IOrganisation
        UserOrganisation: IUserOrganisation
    }
}

export interface IUserCreateError {
    success: false
    error: Error
}

export type IUserCreate = IUserCreateSuccess | IUserCreateError

export interface DBError {
    success: false
    error: Error
}
