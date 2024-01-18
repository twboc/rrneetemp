import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, ITrackerDomainStats, ITrackerDomainStatsQuery, ITrackerQueryVariantWithResult } from '../../../shared/type/type'
import { getAllDomains, createDomain, createQuery, chageSelectedDomain } from './tracker.action'
import { domainOnChange, onChange, getSelectedDomain, statsDefault } from './tracker.util'
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

  const queryInput = React.useRef(null)

  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  const selectQuery = (query: ITrackerDomainStatsQuery) => () => {
    selectedQueries.indexOf(query.id) < 0
      ? setSelectedQueries([...selectedQueries, query.id])
      : setSelectedQueries(selectedQueries.filter((query_id: string) => query_id != query.id  ))
  }

  const selectAll = () => {
    selectedQueries.length > 0
      ? setSelectedQueries([])
      : setSelectedQueries([...stats.query.map(el => el.id)])
  }

  const addVariants = () => {

    const queries = stats.query.filter((query) => selectedQueries.indexOf(query.id) )
    console.log("queries: ", selectedQueries.length, queries)

  }

  const checkbox = (location: string) => () => {
    locations.indexOf(location) < 0
      ? setLocations([...locations, location])
      : setLocations(locations.filter(loc => loc != location))
  }

  const addBulk = () => {
    const queries = bulkText
      .split(/\r?\n/)
      .filter(el => el != '')

    createQuery(domains, queries, selectedDomain, locations, organisations, stats, setStats, setQuery)()
  }

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key.toString().trim() == 'Enter') {

        if (document.activeElement === queryInput.current) {
          createQuery(domains, event.srcElement.value, selectedDomain, locations, organisations, stats, setStats, setQuery)()
        }

        event.preventDefault();
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }

  }, [domains, query, selectedDomain, organisations, stats])

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
      <br/>
      <TrackerLocation locations={locations} checkbox={checkbox} />
      <br/>
      <br/>
      <TrackerBulk showBulk={showBulk} setShowBulk={setShowBulk} setBulkText={setBulkText} addBulk={addBulk} />
      <br/>
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
                <div className='tracker-domain-query-checkbox-container'>
                  <input type="checkbox" checked={selectedQueries.indexOf(query.id) >= 0} onChange={selectQuery(query)} />
                </div>
                <>{query.query} - </>
                {
                  query.query_variant.map((query_variant) => {
                    return <div>
                      {query_variant.location}:
                      {/* <>{query_variant.search_engine} Device: {query_variant.device}</>
                      <br/>
                       */}
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
                    </div>
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
