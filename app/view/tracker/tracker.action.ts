import { Dispatch, SetStateAction } from 'react'
import isValidDomain from 'is-valid-domain'
import resource from '../../resource/resource'

export const addDomain = async (setInvalidDomain: Dispatch<SetStateAction<boolean>>, domain: string, organisation_id: string) => {
  console.log("domain: ", domain)

  setInvalidDomain(false)

  const isValid = isValidDomain(domain, {subdomain: true, wildcard: false, allowUnicode: true})

  if (!isValid) {
      return setInvalidDomain(true)
  }

  const res = await resource.api.tracker.create({
    domain,
    organisation_id
  })

  if (!res.success) {
    console.log("Error in response")
    return
  }

  console.log("res: ", res)

}


