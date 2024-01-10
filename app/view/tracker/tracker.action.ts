import { Dispatch, SetStateAction } from 'react'
import isValidDomain from 'is-valid-domain'
import resource from '../../resource/resource'
import { IQueryCreate, IDomainListed } from '../../../shared/type/type'

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

  console.log("res: ", res)

  setQueryList(res.data)

}

