import type {user_organisation as IUserOrganisation} from '@prisma/client'
import db from '../db/db'
import { IInsert } from './model.type'
import { Success, Fail } from './model.util'

const UserOrganisationModel = {
  create: async (payload: IUserOrganisation): Promise<IInsert<'UserOrganisation',IUserOrganisation, IUserOrganisation>> =>
    await db.user_organisation
      .create({data: payload})
      .then((insert) => Success('UserOrganisation', payload, insert))
      .catch((error: Error) => Fail('UserOrganisation', payload, error))
}

export default UserOrganisationModel
