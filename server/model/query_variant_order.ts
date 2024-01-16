import type { ITrackerQueryVariant, ITrackerQueryVariantOrder } from '../../shared/type/type'
import db from '../db/db'
import { IInsert} from './model.type'
import { success, fail } from './model.util'

const QueryVariantModel = {

  createMany: async (payload: ITrackerQueryVariantOrder[]): Promise<IInsert<'QueryVariantOrder', ITrackerQueryVariantOrder, ITrackerQueryVariantOrder>> => {

    const res = await db.query_variant_order
    //@ts-ignore
        .createMany({ data: payload})
        .then((insert) => success('QueryVariantOrder', payload, insert))
        .catch((error: Error) => fail('QueryVariantOrder', payload, error))

    //@ts-ignore
    return res
  },

  getAllPendingByDomainOrderId: async (payload: { domain_order_id: string}) => {
    const result = await db.query_variant_order
    .findMany({
      where: {
        ...payload,
        status: 'pending'
      },
      include: {
        query_variant: {
          include: {
            query: true
          }
        }
      }
    })
    .then((data) => success('QueryVariantOrder', {}, data))
    .catch((error: Error) => fail('QueryVariantOrder', {}, error))

  return result
  },

}

export default QueryVariantModel
