import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, IQueryCreate, ITrackerDomainStats, ITrackerDomainStatsQuery } from '../../../shared/type/type'
import { getAllDomains, createDomain, createQuery } from './tracker.action'
import { domainOnChange, onChange, getSelectedDomain } from './tracker.util'

const Tracker: FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [invalidDomain, setInvalidDomain] = useState<boolean>(false)
  const [domains, setDomains] = useState<IDomainListed[]>([])
  const [query, setQuery] = useState<string>('')
  const [stats, setStats] = useState<ITrackerDomainStats>({
    id: '',
    domain: '',
    query: []
  })

  const [queryStatsLoading, setQueryStatsLoading] = useState<boolean>(true)

  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  useEffect(() => {
    console.log("get user organisations")
    getAllDomains(organisations[0].organisation_id, setDomains, setSelectedDomain, setQueryStatsLoading, setStats)
  }, [])
    
  return (
    <div className="tracker-container">
      Add Property:
      <span>{invalidDomain ? ' Invalid Domain' : ''}</span>
      <br />
      <input onChange={domainOnChange(setSelectedDomain)} />
      <button title="Add" onClick={createDomain(setInvalidDomain, selectedDomain, organisations, domains, setDomains)} className="btn btn-primary btn-block mb-4">Add</button>
      <br/>
      <br/>
      <div><b>Selected Domain: {selectedDomain}</b></div>
      <br/>
      <div>
        {
          domains.map((domain) => {
            return <div>
              {domain.domain} - {domain.domain_id} - 
              <button className="btn btn-primary btn-block mb-4" >Select</button>
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
      <br/>
      <button type="submit" onClick={createQuery(query, selectedDomain, organisations, setStats, setQuery)} className="btn btn-primary btn-block mb-4" >
        Add Query
      </button>
      <br/>
      <br/>

        <div>

          {
            queryStatsLoading && <div>Loading</div>
          }

          {
            !queryStatsLoading && stats.query.length > 0 && stats.query.map((query: ITrackerDomainStatsQuery) => {
              return <div className="tracker-domain-query-container" >
                <div>{query.query}</div>
                {
                  query.query_variant.map((query_variant) => {
                    return <><>{query_variant.search_engine} Device: {query_variant.device}</><br/></>
                  })
                }
              </div>
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Tracker
