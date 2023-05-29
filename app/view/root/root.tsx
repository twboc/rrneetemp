import React from 'react'
import Navigation from '../../navigation/navigation'
import State from '../../state/state'
// import { StorePersistor } from '../../State/State'
import {StoreProvider, PersistGate} from '../../module/store/store'
const Root = () => {
  return (
    <>
      <StoreProvider store={State.store}>
        <Navigation />
      </StoreProvider>
    </>
  )
}

export default Root
