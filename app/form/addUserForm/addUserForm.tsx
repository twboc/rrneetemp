import React, {FC, useState} from 'react'
import {validateEmail, onChange} from '../../util/util'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import resource from '../../resource/resource'
import {ERROR_CODE} from '../../../shared/error/error'
import cookie from '../../module/cookie/cookie'
import storage from '../../module/storage/storage'
import {CONST_KEYS} from '../../const/const'
import url from '../../module/url/url'
import {IUserOrganisationByUser} from '../../../shared/type/type'
import {organisation} from '../../state/state.actions'

export enum AddUserAction {
  register,
  add,
}

type AddUserFormProps = AddUserFormRegisterProps | AddUserFormAddProps

interface AddUserFormRegisterProps {
  action: AddUserAction.register
}

interface AddUserFormAddProps {
  action: AddUserAction.add
  organisation: IUserOrganisationByUser
}

const AddUserForm: FC<AddUserFormProps> = props => {
  const isRegister = props.action == AddUserAction.register
  const isAddUser = props.action == AddUserAction.add

  const [email, setEmail] = useState<string>('')
  const [emailRepeat, setEmailRepeat] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordRepeat, setPasswordRepeat] = useState<string>('')
  const [registerCheck, setRegisterCheck] = useState<boolean>(true)

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const [emailMismatch, setEmailMismatch] = useState<boolean>(false)
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false)
  const [userAlreadyRegistered, setUserAlreadyRegistered] =
    useState<boolean>(false)

  const check = () => {
    registerCheck ? setRegisterCheck(false) : setRegisterCheck(true)
    return
  }

  const identicalEmail = () => email == emailRepeat
  const identicalPassword = () => password == passwordRepeat

  const resetErrors = async () => {
    setUserAlreadyRegistered(false)
    setInvalidEmail(false)
    setEmailMismatch(false)
    setPasswordMismatch(false)
    return false
  }

  const checkEmail = () => {
    if (!validateEmail(email)) {
      setInvalidEmail(true)
    }
    if (!identicalEmail()) {
      setEmailMismatch(true)
    }
  }

  const checkPassword = () => {
    if (!identicalPassword()) {
      setPasswordMismatch(true)
    }
  }

  const submit = async () => {
    resetErrors()
    checkEmail()
    checkPassword()

    if (!validateEmail(email) || !identicalEmail() || !identicalPassword()) {
      return
    }

    if (isRegister) {
      const res = await resource.api.auth.signup({
        email,
        emailRepeat,
        password,
        passwordRepeat,
      })

      if (!res.success) {
        if (res.error.code === ERROR_CODE.USER_REGISTERED) {
          setUserAlreadyRegistered(true)
        }
        return
      }

      if (res.success) {
        await storage.set(CONST_KEYS.authorization, res.data.authorization)
        await cookie.set(CONST_KEYS.authorization, res.data.authorization)
        url.changePath('/app')
      }
    }

    if (isAddUser) {
      const res = await resource.api.organisation.user.add({
        email,
        emailRepeat,
        password,
        passwordRepeat,
        organisation_id: props.organisation.organisation_id,
      })

      if (!res.success) return

      const userOrganisationWithUser = {
        ...res.data.user_organisation,
        ...res.data.user,
      }

      organisation.addUserOrganisation([userOrganisationWithUser])
    }
  }

  return (
    <>
      {userAlreadyRegistered && <ErrorLabel text="User Already Registered" />}

      <div className="form-outline mb-4">
        <InputLabel
          id="registerEmail"
          name="Email"
          type="email"
          onChange={onChange(setEmail)}
        />
        {invalidEmail && <ErrorLabel text="Invalid Email" />}
        {emailMismatch && <ErrorLabel text="Email Mismatch" />}
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
        {passwordMismatch && <ErrorLabel text="Password Mismatch" />}
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

      <button
        type="submit"
        className="btn btn-primary btn-block mb-3"
        onClick={submit}>
        {isRegister ? 'Sign In' : 'Add user'}
      </button>
    </>
  )
}

export default AddUserForm
