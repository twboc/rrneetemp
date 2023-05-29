import React from 'react'
import {organisationSelect} from '../../state/organisation/organisation'
import {useSelector} from '../../module/store/store'
import {IUserOrganisationByUser} from '../../../shared/type/type'
import OrganisationEditor from '../../container/organisationEditor/organisationEditor'

const Organisations = () => {
  const organisations: IUserOrganisationByUser[] = useSelector(
    organisationSelect.organisations,
  )

  return (
    <>
      <div className="p-3">
        <h2>My Organisations</h2>
        {organisations.map((organisation: IUserOrganisationByUser) => {
          return (
            <>
              <OrganisationEditor organisation={organisation} />
              <hr />
            </>
          )
        })}
      </div>
    </>
  )
}

export default Organisations
