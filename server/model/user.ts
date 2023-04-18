import type {user as User} from '@prisma/client'
import db from '../db/db'

const user = {
  create: async (user: User) => {
    return await db.user.create({data: user})
  },
  findUniqueEmail: async (email: string): Promise<User> => {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    })
  },
}

export {user}
