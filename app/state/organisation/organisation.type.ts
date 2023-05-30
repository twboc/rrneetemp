import { IUserOrganisationByUser, IUserOrganisation, IUserOrganisationWithUser } from '../../../shared/type/type'

export default interface IOrganisationState {
	organisations: IUserOrganisationByUser[]
	user_organisation: IUserOrganisationWithUser[]
}

export type IOrganisationPayloads = {
	set: IUserOrganisationByUser[],
	setUserOrganisation: IUserOrganisationWithUser[]
	addUserOrganisation: IUserOrganisationWithUser[]
	removeUserOrganisation: {user_id: string, organisation_id: string}
	setName: IUserOrganisationByUser
}
