import type {IQueryCreate as IQueryCreateData} from '../../../shared/type/type'

export interface IDomainidReq {
  domain: string
  domain_id: string
}

export interface IDomainCreateReq {
  domain: string
  organisation_id: string
}

export interface IDomainGetAllReq {
  organisation_id: string
}

export interface IQueryCreate {
  domain: string
  queries: IQueryCreateData[]
  organisation_id: string
}
