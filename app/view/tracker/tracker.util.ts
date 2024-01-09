import { Dispatch, SetStateAction } from 'react'
import { IDomainListed } from '../../../shared/type/type'
import resource from '../../resource/resource'

export const getAllDomains = async (
    organisation_id: string,
    setDomains: Dispatch<SetStateAction<IDomainListed[]>>,
    setSelectedDomain: Dispatch<SetStateAction<string>>,
) => {
  console.log("organisation_id: ", organisation_id)
  const res = await resource.api.tracker.domain.get.all({ organisation_id })

  console.log("res: ", res, res.data.DomainPermissionWithDomain)
  //@ts-ignore
  if (res) {
    setDomains(res.data.DomainPermissionWithDomain)
    if (res.data.DomainPermissionWithDomain.length > 0) {
        setSelectedDomain(res.data.DomainPermissionWithDomain[0].domain_id)
    }
  } 
  
}


export const domainOnChange = (setSelectedDomain: Dispatch<SetStateAction<string>>) => (e: any) => { setSelectedDomain(e.target.value) }

export const onChange = (set: Dispatch<SetStateAction<string>>) => (e: any) => { set(e.target.value) }
