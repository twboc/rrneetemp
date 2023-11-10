import type {
    user_organisation as IUserOrganisation,
    organisation as IOrganisation,
    user as IUser,
    domain as IDomain,
    domain_permission as IDomainPermission
} from '@prisma/client'

export { IUserOrganisation, IOrganisation, IUser, IDomain, IDomainPermission }

export type IUserOrganisationWithUser = Omit<IUser, 'salt' | 'password_hash'> & IUserOrganisation

export interface IUserOrganisationWithOrganisation extends IUserOrganisation {
    organisation: Omit<IOrganisation, 'id'>
}

export interface IUserOrganisationByUser extends IUserOrganisation {
    name: string
}
