import {Dispatch, SetStateAction} from 'react'
import {v4} from 'uuid'
import {IDomainListed} from '../../../shared/type/type'

export const queryConstructor = (
  domain_id: string,
  queries: string[],
  location: string[],
) => {
  return queries.map(query => ({
    id: v4(),
    domain_id: domain_id,
    query: query,
    search_engine: 'google.pl',
    device: ['desktop', 'mobile'],
    location: location,
  }))
}

export const domainOnChange =
  (setSelectedDomain: Dispatch<SetStateAction<string>>) => (e: any) => {
    setSelectedDomain(e.target.value)
  }

export const onChange = (set: Dispatch<SetStateAction<string>>) => (e: any) => {
  set(e.target.value)
}

export const getSelectedDomain = (
  domains: IDomainListed[],
  selectedDomain: string,
) => {
  return domains && domains.length > 0
    ? domains.filter(domain => domain.domain_id == selectedDomain)[0].domain
    : ''
}

export const statsDefault = {
  id: '',
  domain: '',
  query: [],
}
