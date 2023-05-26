import React from 'react'
import action from '../../action/action'

const Logout = () => {
  return (
    <div
      className="cursor-pointer"
      style={{lineHeight: '25px', display: 'flex'}}
      onClick={action.auth.logout}>
      <i style={{fontSize: '25px', color: 'grey'}} className="fa fa-sign-out" />
      <div style={{marginTop: '-1px', marginLeft: '5px'}}>Logout</div>
    </div>
  )
}

export default Logout
