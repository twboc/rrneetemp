import type {
    user_organisation as IUserOrganisation,
    organisation as IOrganisation,
    user as IUser,
    domain as IDomain,
    domain_permission as IDomainPermission
} from '@prisma/client'

export { IUserOrganisation, IOrganisation, IUser, IDomain, IDomainPermission }

export type IUserOrganisationWithUser = Omit<IUser, 'salt' | 'password_hash'> & IUserOrganisation

export interface IUserOrganisationWithOrganisation extends IUserOrganisation {
    organisation: Omit<IOrganisation, 'id'>
}

export interface IUserOrganisationByUser extends IUserOrganisation {
    name: string
}

export interface ItrackerDomainPermission {
    id: string
    domain_id: string
    user_id: string
    organisation_id: string
    access: string
}

export interface ITrackerDomain {
    id: string
    domain: string
    permissions: ItrackerDomainPermission[]
}

export interface ITrackerDomainStatsQuery extends ITrackerQuery {
    query_variant: ITrackerQueryVariant[]
}

export interface ITrackerDomainStats {
    id: string
    domain: string
    query: ITrackerDomainStatsQuery[]
}

export interface IDomainListed {
    id: string //'7c3a9dfa-3e6f-4fb9-8929-dc27b8ab722b',
    domain_id: string // '210b0a4e-0241-4581-93de-5b0c2d3124ef',
    organisation_id: string // '967b8ed9-ae1b-43c7-8921-13877150c12c',
    user_id: string // 'd153f74e-fa2e-41ea-af65-787b5dbdd9b5',
    access: string // 'OWNER',
    domain: string // 'adfasdfsdf.pl'
}

export interface IQueryCreate {
    domain_id: string
    query: string
    search_engine: string
    device: string[] //desktop mobile
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
}

export interface IQuery {
    queries: ITrackerQuery[]
    organisation_id: string
}

