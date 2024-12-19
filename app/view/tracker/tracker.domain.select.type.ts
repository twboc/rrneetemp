import React from 'react'
import {IDomainListed, ITrackerDomainStats} from '../../../shared/type/type'

interface TrackerDomainSelectProps {
  selectedDomain: string
  domains: IDomainListed[]
  setSelectedDomain: React.Dispatch<React.SetStateAction<string>>
  setStats: React.Dispatch<React.SetStateAction<ITrackerDomainStats>>
  setQueryStatsLoading: React.Dispatch<React.SetStateAction<boolean>>
  chageSelectedDomain: (
    setSelectedDomain: React.Dispatch<React.SetStateAction<string>>,
    setStats: React.Dispatch<React.SetStateAction<ITrackerDomainStats>>,
    setQueryStatsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    domain_id: string,
  ) => () => Promise<void>
}

export default TrackerDomainSelectProps
