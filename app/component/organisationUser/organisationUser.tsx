import React, {FC} from 'react'
import resource from '../../resource/resource'
import {organisation} from '../../state/state.actions'
import {IUserOrganisationWithUser} from '../../../shared/type/type'

interface OrganisationUserProps {
  organisationUser: IUserOrganisationWithUser
}

const OrganisationUser: FC<OrganisationUserProps> = props => {
  const remove = (user_id: string, organisation_id: string) => async () => {
    const res = await resource.api.organisation.user.delete({
      user_id,
      organisation_id,
    })

    if (!res.success) return

    organisation.removeUserOrganisation({user_id, organisation_id})
  }

  return (
    <div className="row">
      <div className="card mb-1">
        <div className="card-body">
          <div>
            <p>
              {`${props.organisationUser.position} `} <br />
              {props.organisationUser.email} {props.organisationUser.given_name}{' '}
              {props.organisationUser.family_name}
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-danger btn-block mb-4"
              onClick={remove(
                props.organisationUser.user_id,
                props.organisationUser.organisation_id,
              )}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganisationUser
