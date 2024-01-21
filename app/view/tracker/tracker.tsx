import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, ITrackerDomainStats, ITrackerDomainStatsQuery, ITrackerQueryVariantWithResult } from '../../../shared/type/type'
import { domainOnChange, onChange, getSelectedDomain, statsDefault } from './tracker.util'
import { getAllDomains, createDomain, createQuery, chageSelectedDomain, addOnEnter, getAddBulk } from './tracker.action'
import { getSelectQuery, getSelectAll, getLocationCheck } from './tracker.behaviour'
import TrackerLocation from './tracker.location'
import TrackerBulk from './tracker.bulk'
import TrackerDomainSelect from './tracker.domain.select'

const Tracker: FC = () => {
  const [domain, setDomain] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [invalidDomain, setInvalidDomain] = useState<boolean>(false)
  const [domains, setDomains] = useState<IDomainListed[]>([])
  const [query, setQuery] = useState<string>('')
  const [stats, setStats] = useState<ITrackerDomainStats>(statsDefault)
  const [queryStatsLoading, setQueryStatsLoading] = useState<boolean>(true)
  const [locations, setLocations] = useState<string[]>(['no_location'])
  const [selectedQueries, setSelectedQueries] = useState<string[]>([])
  const [showBulk, setShowBulk] = useState<boolean>(false)
  const [bulkText, setBulkText] = useState<string>('')

  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  const queryInput = React.useRef(null)

  const selectQuery = getSelectQuery(selectedQueries, setSelectedQueries)
  const selectAll =  getSelectAll(selectedQueries, setSelectedQueries, stats)
  const locationCheck = getLocationCheck(locations, setLocations)

  const addBulk = getAddBulk(domains, bulkText, selectedDomain, locations, organisations, stats, setStats, setQuery)

  const addVariants = () => {

    const queries = stats.query.filter((query) => selectedQueries.indexOf(query.id) >= 0 )

    console.log("locations: ", locations)



  }


  useEffect(
    addOnEnter(queryInput, domains, selectedDomain, locations, organisations, stats, setStats, setQuery),
    [queryInput, domains, query, selectedDomain, organisations, stats]
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
      <TrackerDomainSelect
        selectedDomain={selectedDomain}
        domains={domains}
        setSelectedDomain={setSelectedDomain}
        setStats={setStats}
        setQueryStatsLoading={setQueryStatsLoading}
        chageSelectedDomain={chageSelectedDomain}
      />
      <br/>
      <div className='tracker-domain-container'>
      <div>Domain: {getSelectedDomain(domains, selectedDomain)}</div>
      <br/>
      <input id="tracker-domain-query-input" value={query} ref={queryInput} onChange={onChange(setQuery)} />
      <br/>
      <TrackerLocation locations={locations} checkbox={locationCheck} />
      <br/>
      <TrackerBulk showBulk={showBulk} setShowBulk={setShowBulk} setBulkText={setBulkText} addBulk={addBulk} />
      <br/>
      <button type="submit" onClick={createQuery(domains, [query], selectedDomain, locations, organisations, stats, setStats, setQuery)} className="btn btn-primary btn-block mb-4" >
        Add Query
      </button>
      <br/>
      <br/>
        <div>
          { queryStatsLoading && <div>Loading</div> }
          { selectedQueries.length > 0
            ? "Deselect"
            : "Select"
          }
          <input type="checkbox" checked={selectedQueries.length > 0} onChange={selectAll} />
          <button type="submit" onClick={addVariants} className="btn btn-primary btn-block mb-4" >
            Add Variants
          </button>
          <br/>
          <br/>
          {
            !queryStatsLoading && stats.query.length > 0 && stats.query.map((query: ITrackerDomainStatsQuery) => {
              return <div className="tracker-domain-query-container" >
                {/* <div className='tracker-domain-query-checkbox-container'>
                  <input type="checkbox" checked={selectedQueries.indexOf(query.id) >= 0} onChange={selectQuery(query)} />
                </div> */}
                <>{query.query} - </>
                {
                  query.query_variant.map((query_variant) => {
                    return <>
                      {/* {query_variant.location}: */}
                      {/* {query_variant.search_engine} {query_variant.device} */}
                      {
                        query_variant && 
                        (query_variant as ITrackerQueryVariantWithResult).query_variant_result &&
                        //@ts-ignore
                        (query_variant as ITrackerQueryVariantWithResult).query_variant_result?.length > 0
                        ? //@ts-ignore
                        (query_variant as ITrackerQueryVariantWithResult).query_variant_result[0] && 
                        //@ts-ignore
                        (query_variant.query_variant_result[0].position == -1)
                        ? 'FINISHED: > 100'
                        //@ts-ignore
                        : query_variant.query_variant_result[0]?.position + 1
                        : '> 100'
                        
                      }
                      <br/>
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
