import type { ITrackerQueryVariant } from '../../shared/type/type'
import db from '../db/db'
import { IInsert} from './model.type'
import { success, fail } from './model.util'

const QueryVariantModel = {

  createMany: async (payload: ITrackerQueryVariant[]): Promise<IInsert<'QueryVariant', ITrackerQueryVariant, ITrackerQueryVariant>> => {

    const res = await db.query_variant
        .createMany({ data: payload})
        .then((insert) => success('QueryVariant', payload, insert))
        .catch((error: Error) => fail('QueryVariant', payload, error))

    //@ts-ignore
    return res
  },
  create: async (payload: ITrackerQueryVariant): Promise<IInsert<'QueryVariant', ITrackerQueryVariant, ITrackerQueryVariant>> => {


    const res = await db.query_variant
      .create({ data: payload})
      .then((insert) => success('QueryVariant', payload, insert))
      .catch((error: Error) => fail('QueryVariant', payload, error))

    //@ts-ignore
    return res
  }
}

export default QueryVariantModel
