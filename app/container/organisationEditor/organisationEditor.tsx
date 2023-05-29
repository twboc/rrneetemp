import React, {useState, FC} from 'react'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {onChange} from '../../util/util'
import resource from '../../resource/resource'
import {organisation} from '../../state/state.actions'
import OrganisationEditorProps from './organisationEditor.type'
import {changeName} from './organisationEditor.action'

// const changeName =
//   (isChangingName, setIsChangingName, setError, props, name, setName) =>
//   async () => {
//     try {
//       if (isChangingName) return
//       setIsChangingName(true)
//       console.log('Start')
//       setError(false)
//       const result = await resource.api.organisation.changeName({
//         organisation_id: props.organisation.organisation_id,
//         name,
//       })

//       if (!result.success) {
//         setError(true)
//         return setTimeout(() => {
//           setError(false)
//         }, 3000)
//       }

//       organisation.setName({
//         ...props.organisation,
//         name: result.data.name,
//       })

//       // In case user changes the input before the response from server
//       setName(result.data.name)
//     } finally {
//       setIsChangingName(false)
//     }
//   }

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
