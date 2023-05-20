import { IInsertSuccess, IInsertFail } from './model.type'

export const InsertSucess = <K extends string | number | symbol, Payload, Result>(key: K, payload: Payload, insert: Result) => ({
  success: true,
  payload: {
    [key]: payload
  },
  data: {
    [key]: insert
  }
} as IInsertSuccess<K, Payload, Result>)


export const InsertFail = <K extends string | number | symbol, Payload, Result>(key: K, payload: Payload, error: Error) => ({
  success: false,
  payload: {
    [key]: payload
  },
  error
} as IInsertFail<K, Payload>)
