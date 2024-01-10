import type {IDomain, ITrackerQuery} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const QueryModel = {

  createMany: async (payload: ITrackerQuery[]): Promise<IInsert<'Query', ITrackerQuery[], ITrackerQuery[]>> => {

    const res = await db.query
      .createMany({ data: payload})
      .then((insert) => success('Query', payload, insert))
      .catch((error: Error) => fail('Query', payload, error))

    //@ts-ignore
    return res
  },
  create: async (payload: ITrackerQuery): Promise<IInsert<'Query', ITrackerQuery, ITrackerQuery>> => {


    const res = await db.query
      .create({ data: payload})
      .then((insert) => success('Query', payload, insert))
      .catch((error: Error) => fail('Query', payload, error))

    //@ts-ignore
    return res
  }
}

export default QueryModel
