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
  }
    
//   ,
//   getDomainsByUserAndOrganisation: async (payload: any) => {
//     const result = await db.domain_permission
//       .findMany({
//         where: payload,
//         include: {
//           domain: true
//         }
//       })
//       .then((insert) => success('DomainPermissionWithDomain', payload, insert))
//       .catch((error: Error) => fail('DomainPermissionWithDomain', payload, error))

//     return result
//   },
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
