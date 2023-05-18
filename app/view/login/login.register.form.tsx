import React, {FC, useState} from 'react'
import LoginIcons from './login.icons'
import { validateEmail, onChange } from '../../util/util'
import InputLabel from '../../component/InputLabel/InputLabel'
import ErrorLabel from '../../component/ErrorLabel/ErrorLabel'
import resource from '../../resource/resource'
import { ERROR_CODE } from '../../../shared/error/error'
import Cookie from '../../module/cookie/cookie'
import Storage from '../../module/storage/storage'
import { CONST_KEYS } from '../../const/const'
import Url from '../../module/url/url'

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [emailRepeat, setEmailRepeat] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')
  const [registerCheck, setRegisterCheck] = useState<boolean>(true)

  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const [emailMismatch, setEmailMismatch] = useState<boolean>(false)
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false)

  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState<boolean>(false)

  const check = () => {
    registerCheck ? setRegisterCheck(false) : setRegisterCheck(true)
    return 
  }

  const checkEmail = () => {
    if (!validateEmail(email)) { 
      setHasErrors(true)
      setInvalidEmail(true)
    }
    if (email != emailRepeat) {
      setHasErrors(true)
      setEmailMismatch(true)
    }
  }

  const checkPassword = () => {
    if (password !== passwordRepeat) {
      setHasErrors(true)
      setPasswordMismatch(true)
    }
  }

  const submit = async () => {
    setUserAlreadyRegistered(false)
    setHasErrors(false)
    checkEmail()
    checkPassword()
    
    if (hasErrors) { return }

    const res = await resource.api.signup({ email, emailRepeat, password, passwordRepeat })

    if (!res.data.success) {

      if (res.data.error.code === ERROR_CODE.USER_REGISTERED) {
        setUserAlreadyRegistered(true)
      }

      return false
    }
    
    await Storage.set(CONST_KEYS.authorization, res.data.data.authorization)
    Cookie.set(CONST_KEYS.authorization, res.data.data.authorization)
    Url.changePath('/App')

  }

  return (
    <form>
      <div className="text-center mb-3">
        <p>Sign up with:</p>
        <LoginIcons />
      </div>

      <p className="text-center">or:</p>
      { userAlreadyRegistered && <ErrorLabel text='User Already Registered' />}

      <div className="form-outline mb-4">
        <InputLabel
          id="registerEmail"
          name="Email"
          type="email"
          onChange={onChange(setEmail)}
        />
        { invalidEmail && <ErrorLabel text='Invalid Email' />}
        { emailMismatch && <ErrorLabel text='Email Mismatch' />}
      </div>

      <div className="form-outline mb-4">
        <InputLabel
          id="registerEmailRepeat"
          name="Repeat Email"
          type="email"
          onChange={onChange(setEmailRepeat)}
        />
      </div>

      <div className="form-outline mb-4">
        <InputLabel
          id="registerPassword"
          name="Password"
          type="password"
          onChange={onChange(setPassword)}
        />
        { passwordMismatch && <ErrorLabel text='Password Mismatch' />}
      </div>

      <div className="form-outline mb-4">
        <InputLabel
          id="registerPasswordRepeat"
          name="Repeat password"
          type="password"
          onChange={onChange(setPasswordRepeat)}
        />
      </div>
      <div className="form-check d-flex justify-content-center mb-4">
        <input
          className="form-check-input me-2"
          type="checkbox"
          value=""
          id="registerCheck"
          checked={registerCheck}
          onChange={check}
          aria-describedby="registerCheckHelpText"
        />
        <label className="form-check-label" htmlFor="registerCheck">
          I have read and agreed to the terms
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-3" onClick={submit}>
        Sign in
      </button>
    </form>
  )
}

export default RegisterForm
