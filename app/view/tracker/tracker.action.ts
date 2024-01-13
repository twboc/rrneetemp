import { Dispatch, SetStateAction } from 'react'
import isValidDomain from 'is-valid-domain'
import resource from '../../resource/resource'
import { IQueryCreate, IDomainListed, ITrackerDomainStats } from '../../../shared/type/type'

export const getAllDomains = async (
  organisation_id: string,
  setDomains: Dispatch<SetStateAction<IDomainListed[]>>,
  setSelectedDomain: Dispatch<SetStateAction<string>>,
  setQueryStatsLoading: Dispatch<SetStateAction<boolean>>,
  setStats: Dispatch<SetStateAction<ITrackerDomainStats>>
) => {
console.log("organisation_id: ", organisation_id)
setQueryStatsLoading(true)
const res = await resource.api.tracker.domain.get.all({ organisation_id })

console.log("res: ", res, res.data.DomainPermissionWithDomain)
//@ts-ignore
if (res) {
  await setDomains(res.data.DomainPermissionWithDomain)
  if (res.data.DomainPermissionWithDomain.length > 0) {
      await setSelectedDomain(res.data.DomainPermissionWithDomain[0].domain_id)
      await getQueryStats(res.data.DomainPermissionWithDomain[0].domain_id, setStats)

  }
}

setQueryStatsLoading(false)

}

const getQueryStats = async (domain_id: string, setStats: Dispatch<SetStateAction<ITrackerDomainStats>>) => {

  const result = await resource.api.tracker.domain.get.stats({ domain_id })

  console.log("STATS resutl: ", result.data)

  setStats(result.data)

}

//@ts-ignore
export const createDomain = (setInvalidDomain, selectedDomain, organisations, domains, setDomains) => () => addDomain(
  setInvalidDomain,
  selectedDomain,
  organisations[0].organisation_id,
  domains,
  setDomains
)

export const addDomain = async (
  setInvalidDomain: Dispatch<SetStateAction<boolean>>,
  domain: string,
  organisation_id: string,
  domains: IDomainListed[],
  setDomains: Dispatch<SetStateAction<IDomainListed[]>>,
  ) => {

  setInvalidDomain(false)

  const isValid = isValidDomain(domain, {subdomain: true, wildcard: false, allowUnicode: true})

  if (!isValid) {
      return setInvalidDomain(true)
  }

  const res = await resource.api.tracker.domain.create({
    domain,
    organisation_id
  })

  if (!res.success) {
    console.log("Error in response")
    return
  }

  const newDomain = { ...res.data.permissions[0], domain: res.data.domain, domain_id: res.data.id }

  setDomains([...domains, newDomain])

}


export const addQueries = async (queries: IQueryCreate[], organisation_id: string, setQueryList: any) => {
  console.log("queries: ", queries)
  const res = await resource.api.tracker.query.create({
    queries,
    organisation_id
  })
  setQueryList(res.data)
}

export const queryConstructor = (domain_id: string, query: string) => ({
  domain_id: domain_id,
  query: query,
  search_engine: 'google.pl',
  device: ['desktop', 'mobile']
})

export const createQuery = (query: string, selectedDomain: string, organisations: any, setQueryVariants: any, setQuery: Dispatch<SetStateAction<string>>) => () => {
  console.log("query: ", query)
  const queryData: IQueryCreate = queryConstructor(selectedDomain, query)
  addQueries([queryData], organisations[0].organisation_id, setQueryVariants)
  setQuery("")
}