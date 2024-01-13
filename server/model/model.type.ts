export interface IWithId {
  id: string
}

export interface IWithDomainId {
  domain_id: string
}

export interface IInsertSuccess<K extends string | number | symbol, Payload, Result>{
    success: true
    payload: {
      [key in K]: Payload
    }
    data: {
      [key in K]: Result
    }
}
  
export interface IInsertFail<K extends string | number | symbol, Payload>{
    success: false
    payload: {
      [key in K]: Payload
    }
    error: Error
}
  
export type IInsert<K extends string | number | symbol, Payload, Result> = IInsertSuccess<K, Payload, Result> | IInsertFail<K, Payload>