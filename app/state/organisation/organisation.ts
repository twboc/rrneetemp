import { createSlice } from '../../module/store/store'
import { PayloadAction, Slice } from '../../module/store/store.type'
import initialState from './organisation.init'
import IOrganisationState, { IOrganisationPayloads } from './organisation.type'
import { IStoreState, storeStateSlice } from '../state.type'
import { Reducers, HookedActions } from '../state.type'
import { IUserOrganisationByUser, IUserOrganisationWithUser } from '../../../shared/type/type'

const matchOrganisationUser = (user_id: string, organisation_id: string) => (userOrg: IUserOrganisationByUser) => {
	return userOrg.user_id == user_id && userOrg.organisation_id == organisation_id
} 

const reducers: Reducers<IOrganisationState, IOrganisationPayloads> = {
	set: (state: IOrganisationState, action: PayloadAction<IUserOrganisationByUser[]>) => {
		// console.log("Set action payload: ", action.payload)
		state.organisations = action.payload
	},
	setUserOrganisation: (state: IOrganisationState, action: PayloadAction<IUserOrganisationWithUser[]>) => {
		// console.log("setUserOrganisation action payload: ", action.payload)
		state.user_organisation = [...action.payload]
	},
	addUserOrganisation: (state: IOrganisationState, action: PayloadAction<IUserOrganisationWithUser[]>) => {
		// console.log("setUserOrganisation action payload: ", action.payload)
		state.user_organisation = [...state.user_organisation, ...action.payload]
	},
	removeUserOrganisation: (state: IOrganisationState, action: PayloadAction<{user_id: string, organisation_id: string}>) => {
		const match = matchOrganisationUser(action.payload.user_id, action.payload.organisation_id)
		state.user_organisation = state.user_organisation.filter((userOrg) => { return !match(userOrg) })
	},
	setName: (state: IOrganisationState, action: PayloadAction<IUserOrganisationByUser>) => {
		state.organisations.forEach((organisation) => {
			if (organisation.organisation_id == action.payload.organisation_id) {
				organisation.name = action.payload.name
			}
		})
	}
}

export const organisation: Slice<IOrganisationState> = createSlice({
	name: storeStateSlice.organisation,
	initialState,
	reducers
})

type OrganisationActionsT = HookedActions<IOrganisationPayloads>

const organisationActions = organisation.actions

export { organisationActions, OrganisationActionsT }

export const organisationSelect = {
	organisations: (state: IStoreState): IUserOrganisationByUser[] => state.organisation.organisations,
	userOrganisation: (state: IStoreState): IUserOrganisationWithUser[] => state.organisation.user_organisation,
}

export default organisation.reducer
