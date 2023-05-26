import type {user_organisation as IUserOrganisation} from '@prisma/client'
import type {organisation as IOrganisation} from '@prisma/client'

export interface IUserOrganisationWithOrganisation extends IUserOrganisation {
    organisation: Omit<IOrganisation, 'id'>
}

export interface IUserOrganisationByUser extends IUserOrganisation {
    name: string
}
