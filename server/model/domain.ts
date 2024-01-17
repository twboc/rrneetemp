import util from 'util'
import type {IDomain, ITrackerDomainStats} from '../../shared/type/type'
import db from '../db/db'
import { IWithId, IWithDomainId, IInsert, IInsertSuccess } from './model.type'
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
      where: {
        id: payload.id
      }
    })

    console.log("DB QUERY: ", data)

    return data
  },
  getStats: async (payload: { domain: string, domain_id: string} ): Promise<IInsert<'DomainStats', ITrackerDomainStats, ITrackerDomainStats>> => {

    const result = await db.domain
      .findFirst({
        where: {
          id: payload.domain_id
        },
        include: {
          query: {
            include: {
              query_variant: {
                include: {
                  query_variant_result: {
                    where: {
                      OR: [
                        {
                          domain_full: payload.domain,
                        },
                        {
                          domain_secondary: payload.domain,
                        }
                      ]
                    },
                    orderBy: [
                      {
                        checked_at: 'desc',
                        // position: 'desc'
                      }
                    ],
                    take: 5

                  }
                }
              }
            }
          }
        }
      })
      .then((data) => success('DomainStats', payload, data))
      .catch((error: Error) => fail('DomainStats', payload, error))

      //@ts-ignore
    return result
    
  }

}

export default DomainModel
