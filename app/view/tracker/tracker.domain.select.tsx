import React, { FC } from 'react'
import { IDomainListed, ITrackerDomainStats } from '../../../shared/type/type'

interface TrackerDomainSelectProps {
    selectedDomain: string
    domains: IDomainListed[]
    setSelectedDomain: React.Dispatch<React.SetStateAction<string>>
    setStats: React.Dispatch<React.SetStateAction<ITrackerDomainStats>>
    setQueryStatsLoading: React.Dispatch<React.SetStateAction<boolean>>
    //@ts-ignore
    chageSelectedDomain: (setSelectedDomain, setStats, setQueryStatsLoading, domain_id: string ) => () => Promise<void>
}

const TrackerDomainSelect: FC<TrackerDomainSelectProps> = (props) =>{
    return <>
    <div><b>Selected Domain: {props.selectedDomain}</b></div>
        <br/>
        <div>
        {
          props.domains.map((domain) => {
            return <div>
              {domain.domain} - {domain.domain_id} - 
                <button
                    onClick={props.chageSelectedDomain(props.setSelectedDomain, props.setStats, props.setQueryStatsLoading, domain.domain_id)}
                    className="btn btn-primary btn-block mb-4"
                >
                    Select
                </button>
                <br/>
            </div>
          })
        }
        </div>
    </>
}


export default TrackerDomainSelect