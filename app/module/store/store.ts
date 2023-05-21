import {
	bindActionCreators as bindActionCreatorsRDX,
	createStore as createStoreRDX
} from 'redux'
import {
	createSlice as createSliceRTK,
	createSelector as createSelectorRTK,
	combineReducers as combineReducersRTK,
	configureStore as configureStoreRTK
} from '@reduxjs/toolkit'

import {
	Provider as ProviderRDX,
	connect as connectRDX,
	useSelector as useSelectorRDX
} from 'react-redux'
import {
	persistStore as persistStoreRP,
	persistReducer as persistReducerRP
} from 'redux-persist'
import { PersistGate as PersistGateRP } from 'redux-persist/integration/react'

//SOURCE: redux
export const createStore = createStoreRDX
export const StoreProvider = ProviderRDX
export const bindActionCreators = bindActionCreatorsRDX

//SOURCE: @reduxjs/toolkit
export const createSlice = createSliceRTK
export const createSelector = createSelectorRTK
export const combineReducers = combineReducersRTK
export const configureStore = configureStoreRTK

//SOURCE: react-redux
export const connect = connectRDX
export const useSelector = useSelectorRDX

//SOURCE: redux-persist
export const persistStore = persistStoreRP
export const persistReducer = persistReducerRP
export const PersistGate = PersistGateRP
