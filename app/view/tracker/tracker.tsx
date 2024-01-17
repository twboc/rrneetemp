import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, IQueryCreate, ITrackerDomainStats, ITrackerDomainStatsQuery, ITrackerQueryVariantWithResult } from '../../../shared/type/type'
import { getAllDomains, createDomain, createQuery, chageSelectedDomain } from './tracker.action'
import { domainOnChange, onChange, getSelectedDomain } from './tracker.util'

const Tracker: FC = () => {
  const [domain, setDomain] = useState<string>('')
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
    getAllDomains(organisations[0].organisation_id, setDomains, setSelectedDomain, setQueryStatsLoading, setStats)
  }, [])
    
  return (
    <div className="tracker-container">
      Add Property:
      <span>{invalidDomain ? ' Invalid Domain' : ''}</span>
      <br />
      <input onChange={domainOnChange(setDomain)} />
      <button title="Add" onClick={createDomain(setInvalidDomain, domain, organisations, domains, setDomains)} className="btn btn-primary btn-block mb-4">Add</button>
      <br/>
      <br/>
      <div><b>Selected Domain: {selectedDomain}</b></div>
      <br/>
      <div>
        {
          domains.map((domain) => {
            return <div>
              {domain.domain} - {domain.domain_id} - 
              <button onClick={chageSelectedDomain(setSelectedDomain, setStats, setQueryStatsLoading, domain.domain_id)} className="btn btn-primary btn-block mb-4" >Select</button>
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
      <button type="submit" onClick={createQuery(domains, query, selectedDomain, organisations, stats, setStats, setQuery)} className="btn btn-primary btn-block mb-4" >
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
                <>{query.query} - </>
                {
                  query.query_variant.map((query_variant) => {
                    return <>
                      {/* <>{query_variant.search_engine} Device: {query_variant.device}</>
                      <br/>
                       */}
                      {
                        query_variant && 
                        (query_variant as ITrackerQueryVariantWithResult).query_variant_result &&
                        //@ts-ignore
                        (query_variant as ITrackerQueryVariantWithResult).query_variant_result[0] && 
                        //@ts-ignore
                        query_variant.query_variant_result[0].position + 1
                      }
                    </>
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
