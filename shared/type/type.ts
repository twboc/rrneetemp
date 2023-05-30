import type {user_organisation as IUserOrganisation} from '@prisma/client'
import type {organisation as IOrganisation} from '@prisma/client'
import type {user as IUser} from '@prisma/client'

export { IUserOrganisation, IOrganisation, IUser }

export type IUserOrganisationWithUser = Omit<IUser, 'salt' | 'password_hash'> & IUserOrganisation

export interface IUserOrganisationWithOrganisation extends IUserOrganisation {
    organisation: Omit<IOrganisation, 'id'>
}

export interface IUserOrganisationByUser extends IUserOrganisation {
    name: string
}
