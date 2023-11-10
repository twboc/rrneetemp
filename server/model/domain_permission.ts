import type {IDomainPermission} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const DomainModel = {
  create: async (payload: IDomainPermission): Promise<IInsert<'DomainPermission',IDomainPermission, IDomainPermission>> =>
    await db.domain_permission
      .create({data: payload})
      .then((insert) => success('DomainPermission', payload, insert))
      .catch((error: Error) => fail('DomainPermission', payload, error))
  ,
  getDomain: async (payload: IWithId) => {
    const data = await db.domain_permission.findUnique({
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
