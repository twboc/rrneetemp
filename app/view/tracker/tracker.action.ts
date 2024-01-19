import { Dispatch, SetStateAction } from 'react'
import isValidDomain from 'is-valid-domain'
import resource from '../../resource/resource'
import { IQueryCreate, IDomainListed, ITrackerDomainStats, IUserOrganisationByUser } from '../../../shared/type/type'
import { queryConstructor } from './tracker.util'

export const getAllDomains = async (
  organisation_id: string,
  setDomains: Dispatch<SetStateAction<IDomainListed[]>>,
  setSelectedDomain: Dispatch<SetStateAction<string>>,
  setQueryStatsLoading: Dispatch<SetStateAction<boolean>>,
  setStats: Dispatch<SetStateAction<ITrackerDomainStats>>
) => {
  setQueryStatsLoading(true)
  const res = await resource.api.tracker.domain.get.all({ organisation_id })

  if (!res) return 

  await setDomains(res.data.DomainPermissionWithDomain)


  if (res.data.DomainPermissionWithDomain.length <= 0 ) return

  await setSelectedDomain(res.data.DomainPermissionWithDomain[0].domain_id)
  await getQueryStats(res.data.DomainPermissionWithDomain[0].domain, res.data.DomainPermissionWithDomain[0].domain_id, setStats)

  setQueryStatsLoading(false)

}

//@ts-ignore
export const chageSelectedDomain = (setSelectedDomain, setStats, setQueryStatsLoading, domain_id: string ) => async () => {

  setQueryStatsLoading(true)

  await setSelectedDomain(domain_id)
  await getQueryStats('', domain_id, setStats)

  setQueryStatsLoading(false)
  
}

const getQueryStats = async (domain: string, domain_id: string, setStats: Dispatch<SetStateAction<ITrackerDomainStats>>) => {
  const result = await resource.api.tracker.domain.get.stats({ domain, domain_id })
  console.log("result: ", result)

  let i = 0

  result.data.query.forEach((query) => {
    query.query_variant.forEach((variant) => {
      //@ts-ignore 
      if(variant.query_variant_result.length > 0) {
        i++
        console.log()
      }
    })
  })

  console.log(i)
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

export const addOnEnter = (queryInput: React.MutableRefObject<null>, domains:IDomainListed[], selectedDomain: string, locations: string[], organisations: IUserOrganisationByUser[], stats: ITrackerDomainStats, setStats: React.Dispatch<React.SetStateAction<ITrackerDomainStats>>, setQuery: React.Dispatch<React.SetStateAction<string>>) =>
  () => {
    const keyDownHandler = (event: any) => {
      if (event.key.toString().trim() == 'Enter') {
        if (document.activeElement === queryInput.current) {
          event.preventDefault();
          createQuery(domains, [event.srcElement.value], selectedDomain, locations, organisations, stats, setStats, setQuery)()
        }
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }


export const addQueries = async (domain: string, queries: IQueryCreate[], organisation_id: string, stats:any, setQueryList: any) => {

  const payload = {
    domain,
    queries,
    organisation_id
  }

  const res = await resource.api.tracker.query.create(payload)

  setQueryList({
    ...stats,
    //@ts-ignore
    query: [...stats.query, ...res.data]

  })
  // setQueryList([...stats])
}

export const getAddBulk = (
  domains: IDomainListed[],
  bulkText: string,
  selectedDomain: string,
  locations: string[],
  organisations: IUserOrganisationByUser[],
  stats: any,
  setStats: React.Dispatch<React.SetStateAction<ITrackerDomainStats>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>
) =>
  () => {
    const queries = bulkText
      .split(/\r?\n/)
      .filter(el => el != '')

    createQuery(domains, queries, selectedDomain, locations, organisations, stats, setStats, setQuery)()
  }

export const createQuery = (
  domains: IDomainListed[],
  query: string[],
  selectedDomain: string,
  locations: string[],
  organisations: IUserOrganisationByUser[],
  stats: any,
  setQueryVariants: any,
  setQuery: Dispatch<SetStateAction<string>>
) => 
  () => {
    const domain = domains.filter(el => el.domain_id == selectedDomain)[0].domain
    const queryData: IQueryCreate[] = queryConstructor(selectedDomain, query, locations)
    addQueries(domain, queryData, organisations[0].organisation_id, stats, setQueryVariants)
    setQuery("")
  }