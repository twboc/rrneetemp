import React, {FC, useEffect, useState} from 'react'
import './tracker.scss'
import {organisationSelect} from '../../state/organisation/organisation'
import {useSelector} from '../../module/store/store'
import {
  IDomainListed,
  ITrackerDomainStats,
  ITrackerDomainStatsQuery,
} from '../../../shared/type/type'
import {
  domainOnChange,
  onChange,
  getSelectedDomain,
  statsDefault,
} from './tracker.util'
import {
  getAllDomains,
  createDomain,
  createQuery,
  chageSelectedDomain,
  addOnEnter,
  getAddBulk,
} from './tracker.action'
import {
  getSelectQuery,
  getSelectAll,
  getLocationCheck,
} from './tracker.behaviour'
import TrackerLocation from './tracker.location'
import TrackerBulk from './tracker.bulk'
import TrackerDomainSelect from './tracker.domain.select'
import TrackerQuery from './tracker.query'

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

  const organisations = useSelector(organisationSelect.organisations)

  const queryInput = React.useRef(null)

  const selectQuery = getSelectQuery(selectedQueries, setSelectedQueries)
  const selectAll = getSelectAll(selectedQueries, setSelectedQueries, stats)
  const locationCheck = getLocationCheck(locations, setLocations)

  const addDomain = createDomain(
    setInvalidDomain,
    domain,
    organisations,
    domains,
    setDomains,
  )

  const addBulk = getAddBulk(
    domains,
    bulkText,
    selectedDomain,
    locations,
    organisations,
    stats,
    setStats,
    setQuery,
  )

  const addQuery = createQuery(
    domains,
    [query],
    selectedDomain,
    locations,
    organisations,
    stats,
    setStats,
    setQuery,
  )

  useEffect(
    addOnEnter(
      queryInput,
      domains,
      selectedDomain,
      locations,
      organisations,
      stats,
      setStats,
      setQuery,
    ),
    [queryInput, domains, query, selectedDomain, organisations, stats],
  )

  useEffect(() => {
    getAllDomains(
      organisations[0].organisation_id,
      setDomains,
      setSelectedDomain,
      setQueryStatsLoading,
      setStats,
    )
  }, [])

  const showQueries = !queryStatsLoading && stats.query.length > 0

  return (
    <div className="tracker-container">
      Add Property:
      <span>{invalidDomain ? ' Invalid Domain' : ''}</span>
      <br />
      <input onChange={domainOnChange(setDomain)} />
      <button
        title="Add"
        onClick={addDomain}
        className="btn btn-primary btn-block mb-4">
        Add
      </button>
      <br />
      <br />
      <TrackerDomainSelect
        selectedDomain={selectedDomain}
        domains={domains}
        setSelectedDomain={setSelectedDomain}
        setStats={setStats}
        setQueryStatsLoading={setQueryStatsLoading}
        chageSelectedDomain={chageSelectedDomain}
      />
      <br />
      <div className="tracker-domain-container">
        <div>Domain: {getSelectedDomain(domains, selectedDomain)}</div>
        <br />
        <input
          id="tracker-domain-query-input"
          value={query}
          ref={queryInput}
          onChange={onChange(setQuery)}
        />
        <br />
        <TrackerLocation locations={locations} checkbox={locationCheck} />
        <br />
        <TrackerBulk
          showBulk={showBulk}
          setShowBulk={setShowBulk}
          setBulkText={setBulkText}
          addBulk={addBulk}
        />
        <br />
        <button
          type="submit"
          onClick={addQuery}
          className="btn btn-primary btn-block mb-4">
          Add Query
        </button>
        <br />
        <br />
        <div>
          {queryStatsLoading && <div>Loading</div>}
          {selectedQueries.length > 0 ? 'Deselect' : 'Select'}
          <input
            type="checkbox"
            checked={selectedQueries.length > 0}
            onChange={selectAll}
          />
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Add Variants
          </button>
          <br />
          <br />
          {showQueries &&
            stats.query.map((query: ITrackerDomainStatsQuery) => {
              return <TrackerQuery query={query} />
            })}
        </div>
        <div
          style={{
            minHeight: 350,
            width: '100%',
            border: '1px solid red',
          }}></div>
      </div>
    </div>
  )
}

export default Tracker
