import type { ITrackerQueryVariant, ITrackerQueryVariantResult } from '../../shared/type/type'
import db from '../db/db'
import { IInsert} from './model.type'
import { success, fail } from './model.util'

const QueryVariantModel = {

  createMany: async (payload: ITrackerQueryVariantResult[]): Promise<IInsert<'QueryVariant', ITrackerQueryVariantResult, ITrackerQueryVariantResult>> => {

    const res = await db.query_variant_result
    //@ts-ignore
        .createMany({ data: payload})
        .then((insert) => success('QueryVariant', payload, insert))
        .catch((error: Error) => fail('QueryVariant', payload, error))

    //@ts-ignore
    return res
  },

  getAllByDomainOrderId: async () => {
    const result = await db.query_variant_result
    .findMany({
      where: {
        status: 'pending'
      },
    })
    .then((data) => success('DomainOrder', {}, data))
    .catch((error: Error) => fail('DomainOrder', {}, error))

  return result
  },

  getByQueryVariantIds: async (payload: { ids: string[] }) => {
    const result = await db.query_variant_result
    .findMany({
      where: {
          id: { in: payload.ids },
      }
    })
    .then((data) => success('DomainOrder', {}, data))
    .catch((error: Error) => fail('DomainOrder', {}, error))
    
    return result

  },

  getPortion: async () => {
    const result = await db.query_variant_result
      .findMany({
        take: 20,
        where: {
          status: 'pending'
        },
      })
      .then((data) => success('DomainOrder', {}, data))
      .catch((error: Error) => fail('DomainOrder', {}, error))

    return result
  },


  // create: async (payload: ITrackerQueryVariantResult): Promise<IInsert<'QueryVariant', ITrackerQueryVariantResult, ITrackerQueryVariantResult>> => {

  //   const res = await db.query_variant_result
  //     .create({ data: payload})
  //     .then((insert) => success('QueryVariant', payload, insert))
  //     .catch((error: Error) => fail('QueryVariant', payload, error))

  //   //@ts-ignore
  //   return res
  // }


}

export default QueryVariantModel
