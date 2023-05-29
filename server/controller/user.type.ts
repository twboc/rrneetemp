import type {
    user as IUser,
    organisation as IOrganisation,
    user_organisation as IUserOrganisation
} from '@prisma/client'

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
