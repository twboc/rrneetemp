import React, {useState, FC} from 'react'
import {organisationSelect} from '../../state/organisation/organisation'
import {useSelector} from '../../module/store/store'
import {IUserOrganisationByUser} from '../../../shared/type/type'
import InputLabel from '../../component/inputLabel/inputLabel'
import ErrorLabel from '../../component/errorLabel/errorLabel'
import {onChange} from '../../util/util'
import resource from '../../resource/resource'
import {organisation} from '../../state/state.actions'

interface OrganisationEditorProps {
  organisation: IUserOrganisationByUser
}

const OrganisationEditor: FC<OrganisationEditorProps> = props => {
  const [name, setName] = useState(props.organisation.name)
  const [error, setError] = useState(false)

  const changeName = async () => {
    setError(false)
    const result = await resource.api.organisation.changeName({
      organisation_id: props.organisation.organisation_id,
      name,
    })

    if (!result.success) {
      setError(true)
      return setTimeout(() => {
        setError(false)
      }, 3000)
    }

    organisation.setName({
      ...props.organisation,
      name: result.data.name,
    })

    // In case user changes the input before the response from server
    setName(result.data.name)
  }
  return (
    <div>
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
        onClick={changeName}>
        Change Name
      </button>
      <br />
      <br />
      Invite User
      <br />
      <br />
      {/* <div onClick={getOrganisation}>Get Organisation</div> */}
      <br />
      <br />
    </div>
  )
}

const Organisation = () => {
  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  return (
    <>
      My Organisations
      <br />
      <br />
      {organisations.map((organisation: IUserOrganisationByUser) => {
        return <OrganisationEditor organisation={organisation} />
      })}
    </>
  )
}

export default Organisation
