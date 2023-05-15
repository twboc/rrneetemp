import db from '../db/db'

import { GoogleToken } from '../token/token.type'

const google_token_data = {
  create: async (token: GoogleToken & { user_id: string}) => {
    return await db.google_token_data.create({data: token})
  },
}

export {google_token_data}
