import type {IDomain, ITrackerQuery} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IInsert} from './model.type'
import { success, fail } from './model.util'

const QueryModel = {
    //@ts-ignore
  create: async (payload: ITrackerQuery): Promise<IInsert<'Query', ITrackerQuery, IDomain>> => {
    // const res = await db.query
    // .create({data: payload})
    // .then((insert) => success('Query', payload, insert))
    // .catch((error: Error) => fail('Query', payload, error))
    // return res
  }
    
  ,
//   getDomain: async (payload: IWithId) => {
//     const data = await db.domain.findUnique({
//     //   include: {
//     //     user_organisation: true
//     //   },
//       where: {
//         id: payload.id
//       }
//     })

//     console.log("DB QUERY: ", data)

//     return data
//   }
}

export default QueryModel
