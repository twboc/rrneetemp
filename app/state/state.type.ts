import { Store, PersistPartial, PayloadAction } from '../module/store/store.type'
import IOrganisationState from './organisation/organisation.type'

export enum storeStateSlice {
	organisation = 'organisation',
}

export interface IStoreState {
	organisation: IOrganisationState
}

export type IStoreStateSelector = [(state: IStoreState) => IStoreState]

export type IStoreStateWithPersist = IStoreState & PersistPartial

export default interface IState {
	store: Store<IStoreState>
}

export type Reducers<State, Action> = {
	[Property in keyof Action]: (
		state: State,
		action: PayloadAction<Action[Property]>
	) => void
}

export type HookedActions<Action> = {
	[Property in keyof Action]: (action: Action[Property]) => void
}
