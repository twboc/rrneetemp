import { createSlice } from '../../module/store/store'
import { PayloadAction, Slice } from '../../module/store/store.type'
import initialState from './organisation.init'
import IOrganisationState, { IOrganisationPayloads } from './organisation.type'
import { IStoreState, storeStateSlice } from '../state.type'
import { Reducers, HookedActions } from '../state.type'
import { IUserOrganisationByUser } from '../../../shared/type/type'


const reducers: Reducers<IOrganisationState, IOrganisationPayloads> = {
	set: (state: IOrganisationState, action: PayloadAction<IUserOrganisationByUser[]>) => {


		console.log("action: ", action)

		state.organisations = action.payload

	},
	Get: (state: IOrganisationState, action: PayloadAction<{}>) => {

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
}

export default organisation.reducer
