import { AnyAction, SliceDecorator } from '../module/store/store.type'
import IState from './state.type'
import { ANY } from '../type/type'
import { IStoreState } from './state.type'
import { hookActions } from '../module/store/store.utils'

export const autoDispatch = <T>(state: IState): SliceDecorator<T> =>
	hookActions<T>(null, (payload: AnyAction, ...args: ANY[]) => {
		state.store.dispatch(payload)
		return [payload, ...args]
	})

export const getState = (state: IStoreState): IStoreState => state
