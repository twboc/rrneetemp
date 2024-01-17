import util from 'util'
import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import {v4} from 'uuid'
import { IQueryCreate, ITrackerQuery, ITrackerQueryVariant } from '../../../shared/type/type'
import { createDomainPermission, createDomainOrder } from './tracker.util'

const constructQueryAndVariantInsert = (req: QueryCreateReq) => {
    const queryInsert: ITrackerQuery[] = []
    const queryVariantInsert: ITrackerQueryVariant[] = []

    req.body.queries.forEach(query => {
        const query_id = v4()

        queryInsert.push({ 
            id: query_id,
            domain_id: req.body.queries[0].domain_id,
            query: query.query,
            created_at: new Date()
        })

        query.device.forEach(device => {
            query.location.forEach(location => {
                if (device == 'desktop') {
                    queryVariantInsert.push({
                        id: v4(),
                        query_id: query_id,
                        search_engine: query.search_engine,
                        device: device,
                        location: location
                    })
                }
            })
        })
        
    })

    return {
        queryInsert,
        queryVariantInsert
    }

}

type QueryCreateReq = Request<{}, {}, { domain: string, queries: IQueryCreate[], organisation_id: string}>

const queryCreate = async (req: QueryCreateReq, res: Response) => {

    console.log("req.body: ", req.body)

    const { queryInsert, queryVariantInsert } = constructQueryAndVariantInsert(req)

    const domain_id = req.body.queries[0].domain_id

    const currentDomainOrder = await model.domain_order.getCurrentOrder({ domain_id })

    if (!currentDomainOrder.success) return console.log("!currentDomainOrder.success")

    //@ts-ignore
    const domain_order_id = currentDomainOrder.data.DomainOrder[0].id

    

    console.log("!!!!!!!!!!!!req.body: ", req.body)

    const queryResult = await model.query.createMany(queryInsert)
    if (!queryResult.success) return

    const queryVariantResult = await model.query_variant.createMany(queryVariantInsert)
    if (!queryVariantResult.success) return 

    const query_variant_order = queryVariantInsert.map((el: any) => {
        return {
            id: v4(),
            query_variant_id: el.id,
            domain: req.body.domain,
            domain_order_id: domain_order_id,
            status: 'pending',
            created_at: new Date(),
            checked_at: null,
            type: 'automatic',
        }
    })


    const queryVariantOrderResult = await model.query_variant_order.createMany(query_variant_order)

    if (!queryVariantOrderResult.success) return console.log("!queryVariantOrderResult.success: ", queryVariantOrderResult)

    console.log("currentDomainOrder: ", util.inspect(queryVariantOrderResult, false, null, true))

    // console.log("queryVariantResultResult: ", queryVariantResultResult)

    queryResult.payload.Query.forEach(element => {
        //@ts-ignore
        element.query_variant = []
        //@ts-ignore
        queryVariantResult.payload.QueryVariant.forEach((variant) => {
            if (variant.query_id == element.id) {
                //@ts-ignore
                element.query_variant.push(variant)
            }
        })
    })

    //@ts-ignore
    return respond.tracker.query.create.success(res, queryResult.payload.Query)

}

export const domainCreate = async (req: Request<{}, {}, { domain: string, organisation_id: string}>, res: Response) => {
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const domain = { id : v4(), domain: req.body.domain, tombstone: false }
    const domainResult = await model.domain.create(domain)
    if (!domainResult.success) { console.log("FIRST ERROR")}

    const domainPermission = createDomainPermission(domain.id, token.data.token.id, req.body.organisation_id)
    const domainPermissionResult = await model.domain_permission.create(domainPermission)
    if (!domainPermissionResult.success) { console.log("SECOND ERROR")}

    const domainOrderInsert = createDomainOrder(domain.id)
    const domainOrderResult = await model.domain_order.create(domainOrderInsert)
    if (!domainOrderResult.success) { console.log("THIRD ERROR")}

    const response = {
        ...domain,
        permissions: [domainPermission]
    }

    return respond.tracker.domain.create.success(res, response)
}

export const getAllDomains = async (req: Request<{}, {}, { organisation_id: string }>, res:Response) => {
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const user_organisation = {
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id
    }

    const result = await model.domain_permission.getDomainsByUserAndOrganisation(user_organisation)

    if (!result.success) return

    const flat = result.data.DomainPermissionWithDomain
        .filter((el) => !el.domain.tombstone)
        .map((el) => ({...el, domain: el.domain.domain}))

    //@ts-ignore
    result.data.DomainPermissionWithDomain = flat

    //@ts-ignore
    return respond.tracker.domain.get.all.success(res, result.data)

}

const getAllQueryVariants = async (req: Request<{}, {}, { domain_id: string }>, res: Response) => {

}

const getDomainAllStats = async (req: Request<{}, {}, { domain: string, domain_id: string }>, res: Response) => {
    const result = await model.domain.getStats({ domain: req.body.domain, domain_id: req.body.domain_id })

    //@ts-ignore
    return respond.tracker.domain.get.stats.success(res, result.data.DomainStats)

}

class Tracker {
    domain = {
        create: domainCreate,
        get: {
            all: getAllDomains,
            stats: getDomainAllStats
        }
    }

    query = {
        create: queryCreate,
        get: {
            all: getAllQueryVariants
        }
    }
}

export default new Tracker()