import type {organisation as IOrganisation} from '@prisma/client'
import db from '../db/db'
import { IInsert} from './model.type'
import { InsertSucess, InsertFail } from './model.util'

const OrganisationModel = {
  create: async (payload: IOrganisation): Promise<IInsert<'Organisation', IOrganisation, IOrganisation>> =>
    await db.organisation
      .create({data: payload})
      .then((insert) => InsertSucess('Organisation', payload, insert))
      .catch((error: Error) => InsertFail('Organisation', payload, error))
}

export default OrganisationModel
