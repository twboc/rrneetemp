import type {IDomain} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const DomainModel = {
  create: async (payload: IDomain): Promise<IInsert<'Domain', IDomain, IDomain>> =>
    await db.domain
      .create({data: payload})
      .then((insert) => success('Domain', payload, insert))
      .catch((error: Error) => fail('Domain', payload, error))
  ,
  getDomain: async (payload: IWithId) => {
    const data = await db.domain.findUnique({
    //   include: {
    //     user_organisation: true
    //   },
      where: {
        id: payload.id
      }
    })

    console.log("DB QUERY: ", data)

    return data
  }
}

export default DomainModel
