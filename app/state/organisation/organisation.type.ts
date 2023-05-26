import { IUserOrganisationByUser } from '../../../shared/type/type'

export default interface IOrganisationState {
	organisations: IUserOrganisationByUser[]
}

export type IOrganisationPayloads = {
	set: IUserOrganisationByUser[]
	Get: {}
}
