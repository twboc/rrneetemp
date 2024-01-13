import { Dispatch, SetStateAction } from 'react'
import { IDomainListed } from '../../../shared/type/type'
import resource from '../../resource/resource'



export const domainOnChange = (setSelectedDomain: Dispatch<SetStateAction<string>>) => (e: any) => { setSelectedDomain(e.target.value) }

export const onChange = (set: Dispatch<SetStateAction<string>>) => (e: any) => { set(e.target.value) }

export const getSelectedDomain = (domains: IDomainListed[], selectedDomain: string) => {
  return (domains && domains.length > 0)
    ? domains.filter(domain => domain.domain_id == selectedDomain )[0].domain
    : ''
}