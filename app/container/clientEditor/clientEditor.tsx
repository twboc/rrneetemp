import React, {FC, useEffect} from 'react'
import ClientEditorProps from './clientEditor.type'
import AddUserForm, {AddUserAction} from '../../form/addUserForm/addUserForm'
import {useSelector} from '../../module/store/store'
import {organisationSelect} from '../../state/organisation/organisation'
import resource from '../../resource/resource'
import {organisation} from '../../state/state.actions'
import OrganisationUser from '../organisationUser/organisationUser'
import OrganisationName from '../organisationName/organisationName'

const getUsers = async (organisation_id: string) => {
  const res = await resource.api.organisation.user.get({
    organisation_id,
  })

  if (!res.success) return

  organisation.setUserOrganisation(res.data.user_organisation)
}

const OrganisationEditor: FC<ClientEditorProps> = props => {
  const userOrganisation = useSelector(organisationSelect.userOrganisation)
  useEffect(() => {
    getUsers(props.organisation.organisation_id)
  }, [props.organisation.organisation_id])

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3>Change Name</h3>
          <OrganisationName organisation={props.organisation} />
          <h3>Invite user</h3>
          <AddUserForm action={AddUserAction.add} {...props} />
        </div>
        <div className="col-6">
          <h3>Members</h3>
          {userOrganisation.map(organisationUser => (
            <OrganisationUser organisationUser={organisationUser} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrganisationEditor
