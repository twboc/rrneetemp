import React, { FC, useEffect, useState } from 'react'
import './tracker.scss'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, ITrackerDomainStats, ITrackerDomainStatsQuery, ITrackerQueryVariantWithResult } from '../../../shared/type/type'
import { getAllDomains, createDomain, createQuery, chageSelectedDomain } from './tracker.action'
import { domainOnChange, onChange, getSelectedDomain, statsDefault } from './tracker.util'

const Tracker: FC = () => {
  const [domain, setDomain] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [invalidDomain, setInvalidDomain] = useState<boolean>(false)
  const [domains, setDomains] = useState<IDomainListed[]>([])
  const [query, setQuery] = useState<string>('')
  const [stats, setStats] = useState<ITrackerDomainStats>(statsDefault)
  const [queryStatsLoading, setQueryStatsLoading] = useState<boolean>(true)
  const [locations, setLocations] = useState<string[]>(['no_location'])

  const [showBulk, setShowBulk] = useState<boolean>(false)
  const [bulkText, setBulkText] = useState<string>('')

  const queryInput = React.useRef(null)

  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

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
      <input id="tracker-domain-query-input" value={query} ref={queryInput} onChange={onChange(setQuery)} />
      <br/>
      <br/>
      <div>
        Locations:<br/>
        {locations.join(', ')}
        <br/>
        <br/>
        <div>No Location <input type="checkbox" checked={locations.indexOf('no_location') >= 0} onChange={checkbox('no_location')} /></div>
        <div>Poznań <input type="checkbox" checked={locations.indexOf('Poznań') >= 0} onChange={checkbox('Poznań')} /></div>
        <div>Szczecin <input type="checkbox" checked={locations.indexOf('Szczecin') >= 0} onChange={checkbox('Szczecin')} /></div>
        <div>Katowice <input type="checkbox" checked={locations.indexOf('Katowice') >= 0} onChange={checkbox('Katowice')} /></div>
        <div>Bydgoszcz <input type="checkbox" checked={locations.indexOf('Bydgoszcz') >= 0} onChange={checkbox('Bydgoszcz')} /></div>
        <div>Ruda Śląska <input type="checkbox" checked={locations.indexOf('Ruda Śląska') >= 0} onChange={checkbox('Ruda Śląska')} /></div>
        <div>Tychy <input type="checkbox" checked={locations.indexOf('Tychy') >= 0} onChange={checkbox('Tychy')} /></div>
        <div>Gliwice <input type="checkbox" checked={locations.indexOf('Gliwice') >= 0} onChange={checkbox('Gliwice')} /></div>
        <div>Rybnik <input type="checkbox" checked={locations.indexOf('Rybnik') >= 0} onChange={checkbox('Rybnik')} /></div>
        <div>Bytom <input type="checkbox" checked={locations.indexOf('Bytom') >= 0} onChange={checkbox('Bytom')} /></div>
        <div>Dąbrowa Górnicza <input type="checkbox" checked={locations.indexOf('Dąbrowa Górnicza') >= 0} onChange={checkbox('Dąbrowa Górnicza')} /></div>
        <div>Mikołów <input type="checkbox" checked={locations.indexOf('Mikołów') >= 0} onChange={checkbox('Mikołów')} /></div>
        <div>Zabrze <input type="checkbox" checked={locations.indexOf('Zabrze') >= 0} onChange={checkbox('Zabrze')} /></div>
        <div>Chorzów <input type="checkbox" checked={locations.indexOf('Chorzów') >= 0} onChange={checkbox('Chorzów')} /></div>
        <div>Tarnowskie Góry <input type="checkbox" checked={locations.indexOf('Tarnowskie Góry') >= 0} onChange={checkbox('Tarnowskie Góry')} /></div>
        
      </div>
      <br/>
      <br/>
      <button type="submit" onClick={() => { setShowBulk(!showBulk) }} className="btn btn-primary btn-block mb-4" >
        Show Bulk
      </button>
      {
        showBulk && <div>
          Bulk Text:<br/>
          <textarea onChange={onChange(setBulkText)} className='tracker-domain-query-bulk-textarea'></textarea>

          <button type="submit" onClick={addBulk} className="btn btn-primary btn-block mb-4" >
            Add Bulk
          </button>
        </div>
      }
      
      <br/>
      <br/>
      <button type="submit" onClick={createQuery(domains, [query], selectedDomain, locations, organisations, stats, setStats, setQuery)} className="btn btn-primary btn-block mb-4" >
        Add Query
      </button>
      <br/>
      <br/>
        <div>
          { queryStatsLoading && <div>Loading</div> }
          {
            !queryStatsLoading && stats.query.length > 0 && stats.query.map((query: ITrackerDomainStatsQuery) => {
              return <div className="tracker-domain-query-container" >
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
                        ? '> 100'
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
