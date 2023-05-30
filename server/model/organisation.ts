import type {IOrganisation} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const OrganisationModel = {
  create: async (payload: IOrganisation): Promise<IInsert<'Organisation', IOrganisation, IOrganisation>> =>
    await db.organisation
      .create({data: payload})
      .then((insert) => success('Organisation', payload, insert))
      .catch((error: Error) => fail('Organisation', payload, error)),

  read: async (payload: IWithId) => {
    return db.organisation.findUnique({ where: { id: payload.id }})
      .then((read) => success('Organisation', payload, read))
      .catch((error: Error) => fail('Organisation', payload, error))
  },
  name: {
    update: async (payload: IOrganisation) =>
      await db.organisation
        .update({ where: { id: payload.id}, data: { name: payload.name}})
        .then((update) => success('Organisation', payload, update))
        .catch((error: Error) => fail('Organisation', payload, error))
  }
  
}

export default OrganisationModel
