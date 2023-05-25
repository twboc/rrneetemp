import type {user as IUser} from '@prisma/client'
import db from '../db/db'
import { IInsert } from './model.type'
import { Success, Fail } from './model.util'

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
}

export default UserModel
