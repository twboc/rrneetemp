import { combineReducers } from '../module/store/store'
import { IStoreState } from './state.type'
import organisation from './organisation/organisation'

const rootReducer = combineReducers<IStoreState>({
	organisation
})

export default rootReducer
