import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, IQueryCreate } from '../../../shared/type/type'
import { addDomain, addQueries } from './tracker.action'
import { getAllDomains, domainOnChange, onChange } from './tracker.util'

const getSelectedDomain = (domains: IDomainListed[], selectedDomain: string) => {
  return (domains && domains.length > 0)
    ? domains.filter(domain => domain.domain_id == selectedDomain )[0].domain
    : ''
}



const Tracker: FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [invalidDomain, setInvalidDomain] = useState<boolean>(false)
  const [domains, setDomains] = useState<IDomainListed[]>([])

  const [query, setQuery] = useState<string>('')

  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  useEffect(() => {
    console.log("get user organisations")
    getAllDomains(organisations[0].organisation_id, setDomains, setSelectedDomain)
  }, [])

  const createDomain = () => addDomain(
    setInvalidDomain,
    selectedDomain,
    organisations[0].organisation_id,
    domains,
    setDomains
    )


    const createQuery = () => {
      console.log("query: ", query)

      const queryCreateDataDesktop: IQueryCreate = {
        domain_id: selectedDomain,
        query: query,
        search_engine: 'google.pl',
        device: 'desktop'
      }

      const queryCreateDataMobile: IQueryCreate = {
        domain_id: selectedDomain,
        query: query,
        search_engine: 'google.pl',
        device: 'mobile'
      }

      addQueries([queryCreateDataDesktop, queryCreateDataMobile], organisations[0].organisation_id)


      setQuery("")
    }

  return (
    <div className="tracker-container">
      Add Property:
      <span>{invalidDomain ? ' Invalid Domain' : ''}</span>
      <br />
      <input onChange={domainOnChange(setSelectedDomain)} />
      <button title="Add" onClick={createDomain}>Add</button>
      <br/>
      <br/>
      <div><b>Selected Domain: {selectedDomain}</b></div>
      <br/>
      <div>
        {
          domains.map((domain) => {
            return <div>
              {domain.domain} - {domain.domain_id} - 
              <button>Select</button>
              <br/>
            </div>
          })
        }
      </div>
      <br/>

      <div className='tracker-domain-container'>

      <div>Domain: {getSelectedDomain(domains, selectedDomain)}</div>

      <br/>

      <input value={query} onChange={onChange(setQuery)} />
      

      <br/>

      <button type="submit" onClick={createQuery} className="btn btn-primary btn-block mb-4" >
        Add Query
      </button>


      </div>


    </div>
  )
}

export default Tracker
