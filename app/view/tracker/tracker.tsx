import React, { FC, useEffect, useState } from 'react'
import isValidDomain from 'is-valid-domain'
import './tracker.scss'
import resource from '../../resource/resource'

import {organisationSelect} from '../../state/organisation/organisation'
import {useSelector} from '../../module/store/store'
import {IUserOrganisationByUser} from '../../../shared/type/type'

const Tracker: FC = () => {
    const [domain, setDomain] = useState('')
    const [invalidDomain, setInvalidDomain] = useState(false)

    const organisations: IUserOrganisationByUser[] = useSelector(
      organisationSelect.organisations,
    )

    console.log("organisations: ", organisations[0].organisation_id, organisations)

    const addDomain = async () => {
        console.log("domain: ", domain)

        setInvalidDomain(false)

        const isValid = isValidDomain(domain, {subdomain: true, wildcard: false, allowUnicode: true})

        if (!isValid) {
            return setInvalidDomain(true)
        }

        const res = await resource.api.tracker.create({
          domain,
          organisation_id: organisations[0].organisation_id
        })

        if (!res.success) {
          console.log("Error in response")
          return
        }

        console.log("res: ", res)

    }

    const domainOnChange = (e: any) => { setDomain(e.target.value) }

  return (
    <div className="tracker-container">
        Add Property: 
        <span>{ invalidDomain ? ' Invalid Domain' : ''}</span>
        <br/>
        <input onChange={domainOnChange} />
        <button title="Add" onClick={addDomain}>Add</button>
    </div>
  )
}

export default Tracker
