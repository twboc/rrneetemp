import React, {useState, FC} from 'react'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {onChange} from '../../util/util'
import OrganisationEditorProps from './organisationEditor.type'
import {changeName} from './organisationEditor.action'
import AddUserForm, {AddUserAction} from '../../form/addUserForm/addUserForm'
import {useSelector} from '../../module/store/store'
import {organisationSelect} from '../../state/organisation/organisation'

const OrganisationEditor: FC<OrganisationEditorProps> = props => {
  const [name, setName] = useState(props.organisation.name)
  const [error, setError] = useState(false)
  const [isChangingName, setIsChangingName] = useState(false)
  const userOrganisation = useSelector(organisationSelect.userOrganisation)

  return (
    <div>
      <div className="row">
        <div className="col-6">
          {props.organisation.position}
          <br />
          <InputLabel
            id={`organisation_name_${props.organisation.organisation_id}`}
            name="Name"
            type="text"
            value={name}
            onChange={onChange(setName)}
          />
          {error && <ErrorLabel text={'Name not updated'} />}
          <br />
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={changeName(
              isChangingName,
              setIsChangingName,
              setError,
              props,
              name,
              setName,
            )}>
            {isChangingName ? 'Loading ...' : 'Change Name'}
          </button>
        </div>
        <div className="col-6">
          {userOrganisation.map(userOrg => {
            return (
              <div className="row">
                <div className="col-4">
                  <p>
                    {userOrg.email} {userOrg.given_name} {userOrg.family_name}
                  </p>
                  <p>{userOrg.position}</p>
                </div>
                <div className="col-2">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block mb-4"
                    onClick={() =>
                      alert(`${userOrg.organisation_id} - ${userOrg.user_id}`)
                    }>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <AddUserForm action={AddUserAction.add} {...props} />
    </div>
  )
}

export default OrganisationEditor
