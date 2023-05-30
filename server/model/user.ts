import type {IUser} from '../../shared/type/type'
import db from '../db/db'
import { IInsert } from './model.type'
import { Success, Fail } from './model.util'

interface IWithId {
  id: string
}

const UserModel = {
  create: async (payload: IUser): Promise<IInsert<'User',IUser, IUser>> =>
    await db.user
      .create({data: payload})
      .then((insert) => Success('User', payload, insert))
      .catch((error: Error) => Fail('User', payload, error))
  ,
  findUniqueEmail: async (email: string): Promise<IUser | null> => {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    })
  },
  getOrganisations: async (payload: IWithId) => {


    const data = await db.user.findUnique({
      include: {
        user_organisation: true
      },
      where: {
        id: payload.id
      }
    })

    console.log("DB QUERY: ", data)

    return data
  }
}

export default UserModel
