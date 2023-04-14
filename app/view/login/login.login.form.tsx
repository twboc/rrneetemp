import React, {FC} from 'react'
import LoginIcons from './login.icons'
import LoginFormProps from './login.login.form.type'

const LoginForm: FC<LoginFormProps> = props => {
  return (
    <form>
      <div className="text-center mb-3">
        <p>Sign in with:</p>
        <LoginIcons />
      </div>

      <p className="text-center">or:</p>

      <div className="form-outline mb-4">
        <input type="email" id="loginName" className="form-control" />
        <label className="form-label" htmlFor="loginName">
          Email or username
        </label>
      </div>

      <div className="form-outline mb-4">
        <input type="password" id="loginPassword" className="form-control" />
        <label className="form-label" htmlFor="loginPassword">
          Password
        </label>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="form-check mb-3 mb-md-0">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="loginCheck"
              checked
            />
            <label className="form-check-label" htmlFor="loginCheck">
              {' '}
              Remember me{' '}
            </label>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center">
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Log in
      </button>

      <div className="text-center">
        <p>
          Not a member?{' '}
          <a onClick={() => props.setPane('register')} href="#form-register">
            Register
          </a>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
