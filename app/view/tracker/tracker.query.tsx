import React, {FC, useState} from 'react'
import './tracker.scss'
import {ITrackerDomainStatsQuery} from '../../../shared/type/type'
import {sortObjects, withPosition} from '../../util/util'
import TrackerQueryResult from './tracker.query.result'
import {getTop} from './tracker.query.util'

export interface TrackerQueryProps {
  query: ITrackerDomainStatsQuery
}

const TrackerQuery: FC<TrackerQueryProps> = props => {
  const [expand, setExpand] = useState(false)
  const toggle = (query: ITrackerDomainStatsQuery) => async () => {
    if (expand) {
      console.log('query: ', query)
    }
    setExpand(!expand)
  }

  return (
    <div className="tracker-domain-query-container">
      {props.query.query_variant.map(query_variant => {
        const highest = getTop(query_variant)

        return (
          <>
            <div
              style={{
                cursor: 'pointer',
                border: '1px solid black',
                borderRadius: 3,
                padding: 2,
                width: 100,
                backgroundColor: '#F0F0F0',
              }}
              onClick={toggle(props.query)}>
              Expand
            </div>
            <div>
              {props.query.query}: {highest}
            </div>

            <br />
            {expand && (
              <>
                {query_variant.query_variant_result &&
                  query_variant.query_variant_result
                    .filter(withPosition)
                    .sort(sortObjects('position'))
                    .map(result => {
                      return <TrackerQueryResult result={result} />
                    })}
              </>
            )}
          </>
        )
      })}
    </div>
  )
}

export default TrackerQuery
