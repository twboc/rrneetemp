import { IUserOrganisationWithOrganisation, IUserOrganisationByUser } from '../../../shared/type/type'

export const userOrganisationFlatten = (org: IUserOrganisationWithOrganisation): IUserOrganisationByUser => ({
    user_id: org.user_id,
    organisation_id: org.organisation_id,
    position: org.position,
    name: org.organisation.name,
})
