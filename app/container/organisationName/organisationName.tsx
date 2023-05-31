import React, {FC, useState} from 'react'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {onChange} from '../../util/util'
import {changeName} from './organisationName.action'
import {IUserOrganisationByUser} from '../../../shared/type/type'

interface OrganisationNameProps {
  organisation: IUserOrganisationByUser
}

const OrganisationName: FC<OrganisationNameProps> = props => {
  const [name, setName] = useState(props.organisation.name)
  const [error, setError] = useState(false)
  const [isChangingName, setIsChangingName] = useState(false)
  return (
    <>
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
    </>
  )
}

export default OrganisationName
