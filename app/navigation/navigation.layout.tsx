import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import resource from '../resource/resource'
import {Outlet} from 'react-router-dom'
import Header from '../component/header/header'
import LeftNav from '../component/leftNav/leftNav'
import Content from '../component/content/content'
import action from '../action/action'
import {organisation} from '../state/state.actions'

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <LeftNav />
        <Content>
          <Outlet />
        </Content>
      </div>
    </>
  )
}

const init = async (setIsInitialised: Dispatch<SetStateAction<boolean>>) => {
  const result = await resource.api.user.init()
  if (!result.success) return action.auth.logout()
  organisation.set(result.data.organisations)
  setIsInitialised(true)
}

const Init = () => {
  const [isInitialised, setIsInitialised] = useState<boolean>(false)

  useEffect(() => {
    console.log('Init app...')
    init(setIsInitialised)
  }, [])

  return isInitialised ? <Layout /> : <> Init </>
}

export default Init
