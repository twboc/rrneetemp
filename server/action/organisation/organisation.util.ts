import type {IUserOrganisation} from '../../../shared/type/type'
import {POSITION} from '../../const/const'

export const isOwnerOrMember = (organisations: IUserOrganisation[]) => organisations.filter((org) => org.position == POSITION.OWNER || org.position == POSITION.MEMBER).length > 0
