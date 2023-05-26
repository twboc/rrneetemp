import {
	configureStore,
	persistStore,
	persistReducer
} from '../module/store/store'
import { CurriedGetDefaultMiddleware } from '../module/store/store.type'
import IState, { IStoreState, IStoreStateWithPersist } from './state.type'
import { persistConfig } from './state.config'
import rootReducer from './state.reducer'

export const store = configureStore<IStoreStateWithPersist>({
	reducer: persistReducer<IStoreState>(persistConfig, rootReducer),
	// Why ignore persist/Persist?
	// This is a known error in redux toolkit and at the same time crucial to persist functionality.
	// https://github.com/rt2zz/redux-persist/issues/988
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	middleware: (
		getDefaultMiddleware: CurriedGetDefaultMiddleware<IStoreState>
	) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST']
			}
		})
})

export const storePersistor = persistStore(store)

export const state: IState = { store }

export default state
