import React, {useState, FC} from 'react'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {onChange} from '../../util/util'
import OrganisationEditorProps from './organisationEditor.type'
import {changeName} from './organisationEditor.action'

const OrganisationEditor: FC<OrganisationEditorProps> = props => {
  const [name, setName] = useState(props.organisation.name)
  const [error, setError] = useState(false)
  const [isChangingName, setIsChangingName] = useState(false)

  return (
    <div>
      <div className="w-50">
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
    </div>
  )
}

export default OrganisationEditor
