import React, {FC, useState, Dispatch, SetStateAction} from 'react'
import LoginIcons from './login.icons'
import { validateEmail } from './login.util'
import InputLabel from '../../component/InputLabel/InputLabel'
import ErrorLabel from '../../component/ErrorLabel/ErrorLabel'

import resource from '../../resource/resource'

const onChange = (method: Dispatch<SetStateAction<string>>, callback?: any) => (e: any) => {
  method(e.target.value);
  if (callback) { callback(e) }
}



const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [emailRepeat, setEmailRepeat] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')

  const [hasErrors, setHasErrors] = useState<boolean>(false)
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const [emailMismatch, setEmailMismatch] = useState<boolean>(false)
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false)

  const checkEmail = () => {

    console.log("email: ", email, emailRepeat)

    if (!validateEmail(email)) { 
      setHasErrors(true)
      setInvalidEmail(true)
    }
    if (email != emailRepeat) {
      setHasErrors(true)
      setEmailMismatch(true)
    }

  }

  
  const submit = async () => {

    setHasErrors(false)

    checkEmail()

    if (password !== passwordRepeat) {
      setHasErrors(true)
      setPasswordMismatch(true)
    }

    if (hasErrors) { return }

    const data = { email, emailRepeat, password, passwordRepeat }

    console.log("Data: ", data)

    const res = await resource.api.signup(data)

    console.log("res: ", res)

    
  }

  return (
    <form>
      <div className="text-center mb-3">
        <p>Sign up with:</p>
        <LoginIcons />
      </div>

      <p className="text-center">or:</p>

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
          checked
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
