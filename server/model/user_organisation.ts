import type {user_organisation as IUserOrganisation} from '@prisma/client'
import db from '../db/db'
import { IWithId, IInsert } from './model.type'
import { Success, Fail } from './model.util'

const UserOrganisationModel = {
  create: async (payload: IUserOrganisation): Promise<IInsert<'UserOrganisation',IUserOrganisation, IUserOrganisation>> =>
    await db.user_organisation
      .create({data: payload})
      .then((insert) => Success('UserOrganisation', payload, insert))
      .catch((error: Error) => Fail('UserOrganisation', payload, error)),
  readByUser: async (payload: IWithId) => {
        return await db.user_organisation.findMany({
          include: {
            organisation: {
              select: {
                name: true
              }
            }
          },
          where: {
            user_id: payload.id
          }
        })
          .then((read) => Success('UserOrganisation', payload, read))
          .catch((error: Error) => Fail('UserOrganisation', payload, error))
      },
  readByOrganisationAndUser: async (payload: { user_id: string, organisation_id: string}) => {
    return await db.user_organisation.findMany({
      where: {
        user_id: payload.user_id,
        organisation_id: payload.organisation_id
      }
    })
      .then((read) => Success('UserOrganisation', payload, read))
      .catch((error: Error) => Fail('UserOrganisation', payload, error))
  }
}

export default UserOrganisationModel
