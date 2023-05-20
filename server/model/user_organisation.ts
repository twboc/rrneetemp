import type {user_organisation as IUserOrganisation} from '@prisma/client'
import db from '../db/db'
import { IInsert } from './model.type'
import { InsertSucess, InsertFail } from './model.util'

const UserOrganisationModel = {
  create: async (payload: IUserOrganisation): Promise<IInsert<'UserOrganisation',IUserOrganisation, IUserOrganisation>> =>
    await db.user_organisation
      .create({data: payload})
      .then((insert) => InsertSucess('UserOrganisation', payload, insert))
      .catch((error: Error) => InsertFail('UserOrganisation', payload, error))
}

export default UserOrganisationModel
