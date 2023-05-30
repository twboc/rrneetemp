import type {IUserOrganisation} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert } from './model.type'
import { Success, Fail } from './model.util'
import { POSITION } from '../const/const'

const UserOrganisationModel = {
  create: async (payload: IUserOrganisation): Promise<IInsert<'UserOrganisation', IUserOrganisation, IUserOrganisation>> =>
    await db.user_organisation
      .create({data: payload})
      .then((insert) => Success('UserOrganisation', payload, insert))
      .catch((error: Error) => Fail('UserOrganisation', payload, error)),

  getUsers: async (payload: { organisation_id: string}) => {
        return await db.user_organisation.findMany({
          include: {
            user: {
              select: {
                id: true,
                created_at: true,
                email: true,
                phone: true,
                name: true,
                given_name: true,
                family_name: true,
                locale: true,

                user_organisation: false,
                salt: false,
                password_hash: false
              }
            }
          },
          where: {
            organisation_id: payload.organisation_id
          }
        })
          .then((read) => Success('UserOrganisation', payload, read))
          .catch((error: Error) => Fail('UserOrganisation', payload, error))
      }, 

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
  },
  delete: async (payload: { user_id: string, organisation_id: string, position: POSITION}) => {
    return await db.user_organisation.deleteMany({
        where: {
          user_id: payload.user_id,
          organisation_id: payload.organisation_id,
          position: payload.position
        }
      })
      .then((read) => Success('UserOrganisation', payload, read))
      .catch((error: Error) => Fail('UserOrganisation', payload, error))
  },
}

export default UserOrganisationModel
