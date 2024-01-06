import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser } from '../../../shared/type/type'
import { addDomain } from './tracker.action'
import resource from '../../resource/resource'

const getAllDomains = async (organisation_id: string, setDomains: Dispatch<SetStateAction<IDomainListed[]>>) => {
  console.log("organisation_id: ", organisation_id)
  const res = await resource.api.tracker.domain.get.all({ organisation_id })

  console.log("res: ", res, res.data.DomainPermissionWithDomain.DomainPermissionWithDomain)
  //@ts-ignore
  if (res) {
    setDomains(res.data.DomainPermissionWithDomain)
  } 
  
}

interface IDomainListed {
  id: string //'7c3a9dfa-3e6f-4fb9-8929-dc27b8ab722b',
  domain_id: string // '210b0a4e-0241-4581-93de-5b0c2d3124ef',
  organisation_id: string // '967b8ed9-ae1b-43c7-8921-13877150c12c',
  user_id: string // 'd153f74e-fa2e-41ea-af65-787b5dbdd9b5',
  access: string // 'OWNER',
  domain: string // 'adfasdfsdf.pl'
}


const domainOnChange = (setSelectedDomain: Dispatch<SetStateAction<string>>) => (e: any) => { setSelectedDomain(e.target.value) }

const Tracker: FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [invalidDomain, setInvalidDomain] = useState<boolean>(false)
  const [domains, setDomains] = useState<IDomainListed[]>([])


  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  // console.log("organisations: ", organisations[0].organisation_id, organisations)

  useEffect(() => {
    console.log("get user organisations")
    getAllDomains(organisations[0].organisation_id, setDomains)
  }, [])

  return (
    <div className="tracker-container">
      Add Property:
      <span>{invalidDomain ? ' Invalid Domain' : ''}</span>
      <br />
      <input onChange={domainOnChange(setSelectedDomain)} />
      <button title="Add" onClick={() => addDomain(setInvalidDomain, selectedDomain, organisations[0].organisation_id)}>Add</button>
      <br/>
      <div>
        {
          domains.map((domain) => {
            return <>{domain.domain}<br/></>
          })
        }
      </div>
    </div>
  )
}

export default Tracker
