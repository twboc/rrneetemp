import React, {FC, useState} from 'react'
import resource from '../../resource/resource'
import LoginIcons from './login.icons'
import LoginFormProps from './login.login.form.type'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {validateEmail, onChange} from '../../util/util'
import {ERROR_CODE} from '../../../shared/error/error'
import Cookie from '../../module/cookie/cookie'
import Storage from '../../module/storage/storage'
import {CONST_KEYS} from '../../const/const'
import Url from '../../module/url/url'

const LoginForm: FC<LoginFormProps> = props => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const [userPasswordInvalid, setUserPasswordInvalid] = useState<boolean>(false)
  const [genericError, setGenericError] = useState<boolean>(false)

  const submit = async () => {
    setUserPasswordInvalid(false)
    setGenericError(false)

    if (!validateEmail(email)) {
      return setInvalidEmail(true)
    }

    const res = await resource.api.auth.login({email, password})

    if (
      !res.data.success &&
      res.data.error.code === ERROR_CODE.USER_OR_PASSWORD_INVALID
    ) {
      return setUserPasswordInvalid(true)
    }

    if (!res.data.success) {
      return setGenericError(true)
    }

    if (res.data.success) {
      await Storage.set(CONST_KEYS.authorization, res.data.data.authorization)
      Cookie.set(CONST_KEYS.authorization, res.data.data.authorization)
      Url.changePath('/app')
    }
  }

  return (
    <>
      <div className="text-center mb-3">
        <p>Sign in with:</p>
        <LoginIcons />
      </div>

      <p className="text-center">or:</p>
      {userPasswordInvalid && <ErrorLabel text="User or Password invalid" />}
      {genericError && <ErrorLabel text="Generic Error" />}

      <div className="form-outline mb-4">
        <InputLabel
          id="loginEmail"
          name="Email"
          type="email"
          onChange={onChange(setEmail)}
        />
        {invalidEmail && <ErrorLabel text="Invalid Email" />}
      </div>

      <div className="form-outline mb-4">
        <InputLabel
          id="loginPassword"
          name="Password"
          type="password"
          onChange={onChange(setPassword)}
        />
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

        {/* <div className="col-md-6 d-flex justify-content-center">
          <a href="#!">Forgot password?</a>
        </div> */}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mb-4"
        onClick={submit}>
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
    </>
  )
}

export default LoginForm
