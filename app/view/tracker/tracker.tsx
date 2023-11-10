import React, { FC, useEffect, useState } from 'react'
import isValidDomain from 'is-valid-domain'
import './tracker.scss'

const Tracker: FC = () => {

    const [domain, setDomain] = useState('')
    const [invalidDomain, setInvalidDomain] = useState(false)

    const addDomain = () => {
        console.log("domain: ", domain)

        setInvalidDomain(false)

        const isValid = isValidDomain(domain, {subdomain: true, wildcard: false, allowUnicode: true})

        if (!isValid) {
            setInvalidDomain(true)
            return
        }



        

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
