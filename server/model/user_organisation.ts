import type {IUserOrganisation} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert } from './model.type'
import { success, fail } from './model.util'
import { POSITION } from '../const/const'

const UserOrganisationModel = {
  create: async (payload: IUserOrganisation): Promise<IInsert<'user_organisation', IUserOrganisation, IUserOrganisation>> =>
    await db.user_organisation
      .create({data: payload})
      .then((insert) => success('user_organisation', payload, insert))
      .catch((error: Error) => fail('user_organisation', payload, error)),

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
          .then((read) => success('UserOrganisation', payload, read))
          .catch((error: Error) => fail('UserOrganisation', payload, error))
      }, 

  readByUser: async (payload: { user_id : string}) => {
        return await db.user_organisation.findMany({
          include: {
            organisation: {
              select: {
                name: true
              }
            }
          },
          where: {
            user_id: payload.user_id
          }
        })
          .then((read) => success('UserOrganisation', payload, read))
          .catch((error: Error) => fail('UserOrganisation', payload, error))
      },
  readByOrganisationAndUser: async (payload: { user_id: string, organisation_id: string}) => {
    return await db.user_organisation.findMany({
      where: {
        user_id: payload.user_id,
        organisation_id: payload.organisation_id
      }
    })
      .then((read) => success('UserOrganisation', payload, read))
      .catch((error: Error) => fail('UserOrganisation', payload, error))
  },
  delete: async (payload: { user_id: string, organisation_id: string, position: POSITION}) => {
    return await db.user_organisation.deleteMany({
        where: {
          user_id: payload.user_id,
          organisation_id: payload.organisation_id,
          position: payload.position
        }
      })
      .then((read) => success('UserOrganisation', payload, read))
      .catch((error: Error) => fail('UserOrganisation', payload, error))
  },
}

export default UserOrganisationModel
