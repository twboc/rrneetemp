import type {organisation as IOrganisation} from '@prisma/client'
import db from '../db/db'
import { IInsert} from './model.type'
import { Success, Fail } from './model.util'

interface IWithId {
  id: string
}

const OrganisationModel = {
  create: async (payload: IOrganisation): Promise<IInsert<'Organisation', IOrganisation, IOrganisation>> =>
    await db.organisation
      .create({data: payload})
      .then((insert) => Success('Organisation', payload, insert))
      .catch((error: Error) => Fail('Organisation', payload, error)),

  read: async (payload: IWithId) => {
    return db.organisation.findUnique({ where: { id: payload.id }})
      .then((read) => Success('Organisation', payload, read))
      .catch((error: Error) => Fail('Organisation', payload, error))
  },
  update: async (payload: IOrganisation) =>
    await db.organisation
      .update({ where: { id: payload.id}, data: { name: payload.name}})
      .then((update) => Success('Organisation', payload, update))
      .catch((error: Error) => Fail('Organisation', payload, error))
}

export default OrganisationModel
