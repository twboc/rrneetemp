import type {IDomainPermission} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const DomainPermissionModel = {
  create: async (payload: IDomainPermission): Promise<IInsert<'DomainPermission',IDomainPermission, IDomainPermission>> =>
    await db.domain_permission
      .create({data: payload})
      .then((insert) => success('DomainPermission', payload, insert))
      .catch((error: Error) => fail('DomainPermission', payload, error))
  ,
  getDomainsByUserAndOrganisation: async (payload: any) => {
    const result = await db.domain_permission
      .findMany({
        where: payload,
        include: {
          domain: true
        }
      })
      .then((insert) => success('DomainPermissionWithDomain', payload, insert))
      .catch((error: Error) => fail('DomainPermissionWithDomain', payload, error))

    return result
  },
  getDomain: async (payload: IWithId) => {
    const data = await db.domain_permission.findUnique({
      where: {
        id: payload.id
      }
    })
    return data
  }
}

export default DomainPermissionModel
