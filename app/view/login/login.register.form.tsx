import React, {FC} from 'react'
import LoginIcons from './login.icons'
import AddUserForm, {AddUserAction} from '../../form/addUserForm/addUserForm'

const RegisterForm: FC = () => {
  return (
    <>
      <div className="text-center mb-3">
        <p>Sign up with:</p>
        <LoginIcons />
      </div>
      <p className="text-center">or:</p>
      <AddUserForm action={AddUserAction.register} />
    </>
  )
}

export default RegisterForm
