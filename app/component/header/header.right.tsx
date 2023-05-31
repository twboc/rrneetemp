import React, {useState} from 'react'
import Logout from '../logout/logout'
import './header.style.scss'

const HeaderRight = () => {
  const [show, setShow] = useState<boolean>(false)

  const toggle = () => setShow(!show)

  return (
    <div className="header_right">
      <div
        style={{
          height: '60px',
          width: '60px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={toggle}>
        {show ? (
          <i
            style={{fontSize: '25px', color: 'grey'}}
            className="fa fa-close cursor-pointer"></i>
        ) : (
          <i
            style={{fontSize: '25px', color: 'grey'}}
            className="fa fa-bars cursor-pointer"></i>
        )}
      </div>
      <div className="header_right_menu_container">
        {show && (
          <div
            className="shadow-1"
            style={{width: '100%', backgroundColor: '#FFF', padding: '10px'}}>
            <Logout />
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderRight
