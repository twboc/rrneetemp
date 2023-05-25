import React, {useState} from 'react'
// import {onChange} from '../../util/util'
// import Resource from '../../resource/resource'

const Organisation = () => {
  const [name, setName] = useState()

  const getOrganisation = () => {
    console.log('GET ORGANISATION: ')

    // Resource.api
  }

  return (
    <>
      Organisation
      <br />
      <input />
      <br />
      <br />
      Add Client
      <br />
      <br />
      <div onClick={getOrganisation}>Get Organisation</div>
      <br />
      <br />
    </>
  )
}

export default Organisation
