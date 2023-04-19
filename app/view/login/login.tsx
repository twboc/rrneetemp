import React, {useState, FC} from 'react'
import LoginSelect from './login.select'
import LoginForm from './login.login.form'
import RegisterForm from './login.register.form'
import withNavigation from '../../template/withNavigation/withNavigation'

const Login: FC = () => {
  const [pane, setPane] = useState('login')
  const showActive = (selected: string) => (pane: string) =>
    pane === selected ? 'show active' : ''

  return (
    <div style={{margin: 'auto', maxWidth: '650px'}}>
      <LoginSelect pane={pane} setPane={setPane} />
      <div className="tab-content">
        <div
          className={`tab-pane fade ${showActive('login')(pane)}`}
          id="form-login"
          role="tabpanel"
          aria-labelledby="tab-login">
          <LoginForm setPane={setPane} />
        </div>
        <div
          className={`tab-pane fade ${showActive('register')(pane)}`}
          id="form-register"
          role="tabpanel"
          aria-labelledby="tab-register">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default withNavigation(Login)
