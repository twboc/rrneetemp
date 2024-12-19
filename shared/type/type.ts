import type {
  user_organisation as IUserOrganisation,
  organisation as IOrganisation,
  user as IUser,
  domain as IDomain,
  domain_permission as IDomainPermission,
} from '@prisma/client'

export {IUserOrganisation, IOrganisation, IUser, IDomain, IDomainPermission}

export type IUserOrganisationWithUser = Omit<IUser, 'salt' | 'password_hash'> &
  IUserOrganisation

export interface IUserOrganisationWithOrganisation extends IUserOrganisation {
  organisation: Omit<IOrganisation, 'id'>
}

export interface IUserOrganisationByUser extends IUserOrganisation {
  name: string
}

export interface ITrackerDomainPermission {
  id: string
  domain_id: string
  user_id: string
  organisation_id: string
  access: string
}

export interface ITrackerDomain {
  id: string
  domain: string
  permissions: ITrackerDomainPermission[]
}

export interface ITrackerDomainOrder {
  id: string
  domain_id: string
  created_at: Date
  finished_at: Date | null
  status: string
  type: string
}

export interface ITrackerDomainStatsQuery extends ITrackerQuery {
  query_variant: ITrackerQueryVariantWithResult[]
}

export interface ITrackerDomainStats {
  id: string
  domain: string
  query: ITrackerDomainStatsQuery[]
}

export interface IDomainListed {
  id: string
  domain_id: string
  organisation_id: string
  user_id: string
  access: string
  domain: string
}

export interface IQueryCreate {
  id: string
  domain_id: string
  query: string
  search_engine: string
  device: string[] //desktop mobile
  location: string[]
}

export interface ITrackerQuery {
  id: string
  domain_id: string
  query: string
  created_at: Date
}

export interface ITrackerQueryVariant {
  id: string
  query_id: string
  search_engine: string
  device: string
  location: string
}

export interface ITrackerQueryVariantWithResult {
  id: string
  query_id: string
  search_engine: string
  device: string
  query_variant_result?: ITrackerQueryVariantResult[]
}

export interface ITrackerQueryVariantOrder {
  id: string
  query_variant_id: string
  status: string
  created_at: Date
  domain: string
}

export interface ITrackerQueryVariantResult {
  id: string
  query_variant_id: string
  query_variant_order_id: string
  domain_order_id: string
  checked_at: Date
  position: number

  domain_full: string
  domain_secondary: string

  url: string
  title: string
  description: string
  type: string
}

export interface IQuery {
  queries: ITrackerQuery[]
  organisation_id: string
}
