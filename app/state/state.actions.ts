import { autoDispatch } from './state.util'
import { state } from './state.state'
import { organisationActions, OrganisationActionsT } from './organisation/organisation'

const organisation = autoDispatch<OrganisationActionsT>(state)({
	...organisationActions
})

export {
	organisation
}
