import React, {FC} from 'react'
import LoginSelectProps from './login.select.type'

const LoginSelect: FC<LoginSelectProps> = props => {
  return (
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          className={`nav-link ${props.pane === 'login' ? 'active' : ''}`}
          id="tab-login"
          data-mdb-toggle="pill"
          href="#form-login"
          role="tab"
          aria-controls="form-login"
          onClick={() => props.setPane('login')}
          aria-selected="true">
          Login
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          className={`nav-link ${props.pane === 'register' ? 'active' : ''}`}
          id="tab-register"
          data-mdb-toggle="pill"
          href="#form-register"
          role="tab"
          aria-controls="form-register"
          onClick={() => props.setPane('register')}
          aria-selected="false">
          Register
        </a>
      </li>
    </ul>
  )
}

export default LoginSelect
