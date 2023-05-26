import React, {useState, useEffect} from 'react'

import state from '../../state/state.state'

const Organisation = () => {
  const [name, setName] = useState()

  const getOrganisation = () => {
    console.log('GET ORGANISATION: ')
  }

  useEffect(() => {
    const _state = state.store.getState()
    console.log('_state: ', _state)
  }, [])

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
