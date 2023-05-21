import {
	Store as StoreRDX,
	Action as ActionRDX,
	AnyAction as AnyActionRDX,
	Dispatch as DispatchRDX
} from 'redux'
import {
	PayloadAction as PayloadActionRTK,
	Slice as SliceRTK,
	SliceCaseReducers as SliceCaseReducersRTK,
	CaseReducerActions as CaseReducerActionsRTK,
	CaseReducers as CaseReducersRTK,
	ActionCreatorWithPayload as ActionCreatorWithPayloadRTK,
	ActionCreatorWithoutPayload as ActionCreatorWithoutPayloadRTK
} from '@reduxjs/toolkit'
import { CurriedGetDefaultMiddleware as CurriedGetDefaultMiddlewareRTK } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux'
import { PersistState as PersistStateRP } from 'redux-persist'
import { ANY, Hook, ChainHook } from '../../Type/Type'

//SOURCE: redux
export type Action<T = ANY> = ActionRDX<T>
export type AnyAction = AnyActionRDX
export type Store<S = ANY, A extends Action = AnyAction> = StoreRDX<S, A>
export type Dispatch = DispatchRDX

//SOURCE: @reduxjs/toolkit
export type SliceCaseReducers<State> = SliceCaseReducersRTK<State>
export type CaseReducerActions<CaseReducers extends SliceCaseReducers<ANY>> =
	CaseReducerActionsRTK<CaseReducers>
export type Actions<T extends keyof ANY = string> = Record<T, Action>
export type CaseReducers<S, AS extends Actions> = CaseReducersRTK<S, AS>

export type Slice<
	State = ANY,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
	Name extends string = string
> = SliceRTK<State, CaseReducers, Name>

export type ActionCreatorWithPayload<
	P,
	T extends string = string
> = ActionCreatorWithPayloadRTK<P, T>

export type ActionCreator =
	| ActionCreatorWithPayload<unknown, string>
	| ActionCreatorWithoutPayload<string>

export interface SliceActions {
	[x: string]: ActionCreator
}

export type CurriedGetDefaultMiddleware<S> = CurriedGetDefaultMiddlewareRTK<S>

//SOURCE: react-redux
export type MapState<TStateProps, TOwnProps, State> = MapStateToPropsParam<
	TStateProps,
	TOwnProps,
	State
>

export type MapDispatch<TDispatchProps, TOwnProps> = MapDispatchToPropsParam<
	TDispatchProps,
	TOwnProps
>

export type ActionCreatorWithoutPayload<T extends string = string> =
	ActionCreatorWithoutPayloadRTK<T>

/**
 * An action with a string type and an associated payload. This is the
 * type of action returned by `createAction()` action creators.
 *
 * @template P The type of the action's payload.
 * @template T the type used for the action type.
 * @template M The type of the action's meta (optional)
 * @template E The type of the action's error (optional)
 *
 * export declare type PayloadActionRTK<P = void, T extends string = string, M = never, E = never>
 */

export type PayloadAction<
	P = void,
	T extends string = string,
	M = never,
	E = never
> = PayloadActionRTK<P, T, M, E>

//SOURCE: redux-persist
export interface PersistState extends PersistStateRP {}

export interface PersistPartial {
	_persist: PersistState
}

//SOURCE: our own
export type HookActionsFN<T> = (
	pre: Hook,
	post: Hook,
	chain: ChainHook
) => SliceDecorator<T>

export type SliceDecorator<T> = (actions: SliceActions) => T
