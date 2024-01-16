import type {ITrackerDomainOrder} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const DomainOrderModel = {
  create: async (payload: ITrackerDomainOrder): Promise<IInsert<'DomainOrder',ITrackerDomainOrder, ITrackerDomainOrder>> => {
    return await db.domain_order
    .create({data: payload})
    .then((insert) => success('DomainOrder', payload, insert))
    .catch((error: Error) => fail('DomainOrder', payload, error))
  },
  getAll: async () => {
    const result = await db.domain_order
      .findMany({
        take: 10,
        where: {
          status: 'pending'
        },
      })
      .then((data) => success('DomainOrder', {}, data))
      .catch((error: Error) => fail('DomainOrder', {}, error))

    return result
  },
  getCurrentOrder: async (payload: { domain_id: string}): Promise<IInsert<'DomainOrder',ITrackerDomainOrder, ITrackerDomainOrder>> => {

    const result = await db.domain_order
      .findMany({
        where: payload,
        orderBy: {
          created_at: 'desc'
        },
        take: 1
      })
      .then((data) => success('DomainOrder', {}, data))
      .catch((error: Error) => fail('DomainOrder', {}, error))

    //@ts-ignore
    return result

  }
//   getDomain: async (payload: IWithId) => {
//     const data = await db.domain_permission.findUnique({
//       where: {
//         id: payload.id
//       }
//     })
//     return data
//   }
}

export default DomainOrderModel
