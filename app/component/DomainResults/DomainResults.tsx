import React, { FC } from 'react'
import DomainResultsProps from './DomainResults.type'
import { decodeHTMLEntities } from '../../util/util'

const DomainResults: FC<DomainResultsProps> = (props) => {
  return <>
    <a href={props.domain} target="_blank" rel="noreferrer">
        <h3>{props.domain}</h3>
    </a>
    {props.results.map((result) => {
      return <>
        <a href={result.url} target="_blank" rel="noreferrer">
            {decodeHTMLEntities(result.title)}
        </a>
        <br/>
        </>
    })}
  </>
}

export default DomainResults
