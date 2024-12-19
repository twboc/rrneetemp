import React, {FC} from 'react'
import './tracker.scss'
import {ITrackerQueryVariantResult} from '../../../shared/type/type'

export interface TrackerQueryResultProps {
  result: ITrackerQueryVariantResult
}

const TrackerQueryResult: FC<TrackerQueryResultProps> = props => {
  return (
    <div>
      <div style={{display: 'inline-block'}}>
        {props.result.position + 1}{' '}
        <a href={props.result.url} target="blank">
          {props.result.title}
        </a>
      </div>
      {/* <br /> */}
      {/* <div>Position: {props.result.position + 1}</div> */}
      <br />
    </div>
  )
}

export default TrackerQueryResult
