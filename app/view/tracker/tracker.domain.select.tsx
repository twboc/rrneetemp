import React, {FC} from 'react'
import {IDomainListed} from '../../../shared/type/type'
import TrackerDomainSelectProps from './tracker.domain.select.type'
import {getSelected, select} from './tracker.domain.select.util'

const TrackerDomainSelect: FC<TrackerDomainSelectProps> = props => {
  const selected = getSelected(props)
  return (
    <>
      <div>
        <b>Selected Domain: {selected?.domain}</b>
      </div>
      <br />
      <div>
        {props.domains.map(domain => {
          return (
            <div>
              {domain.domain}:
              <button
                onClick={select(props, domain)}
                className="btn btn-primary btn-block mb-4">
                Select
              </button>
              <br />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TrackerDomainSelect
