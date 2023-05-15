import db from '../db/db'
import type {google_id_token as Google_id_token} from '@prisma/client'
import { GoogleIdToken } from '../token/token.type'

const google_id_token = {
  create: async (token: GoogleIdToken & { user_id: string}) => {
    return await db.google_id_token.create({data: token})
  },
}

export {google_id_token}
