import { IUserOrganisationByUser, IUserOrganisation, IUserOrganisationWithUser } from '../../../shared/type/type'

export default interface IOrganisationState {
	organisations: IUserOrganisationByUser[]
	user_organisation: IUserOrganisationWithUser[]
}

export type IOrganisationPayloads = {
	set: IUserOrganisationByUser[],
	setUserOrganisation: IUserOrganisation[]
	setName: IUserOrganisationByUser
}
