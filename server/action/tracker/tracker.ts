import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import {v4} from 'uuid'
import { IQueryCreate } from '../../../shared/type/type'

export const domainCreate = async (req: Request<{}, {}, { domain: string, organisation_id: string}>, res: Response) => {
    console.log("Create: ", req.body.domain)
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const domain = { id : v4(), domain: req.body.domain }
    const domainResult = await model.domain.create(domain)
    
    if (!domainResult.success) { console.log("FIRST ERROR")}

    const domainPermission = {
        id: v4(),
        domain_id: domain.id,
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id,
        access: 'OWNER'
    }

    const domainPermissionResult = await model.domain_permission.create(domainPermission)

    if (!domainPermissionResult.success) { console.log("SECOND ERROR")}

    
    const response = {
        ...domain,
        permissions: [domainPermission]
    }

    return respond.tracker.domain.create.success(res, response)

}

export const getAllDomains = async (req: Request<{}, {}, { organisation_id: string }>, res:Response) => {
    console.log('getAllDomains', req.body.organisation_id)

    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const data = {
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id
    }

    const result = await model.domain_permission.getDomainsByUserAndOrganisation(data)

    //@ts-ignore
    const flat = result.data.DomainPermissionWithDomain.map((el) => {
        console.log("el: ", el)
        const temp = {...el, domain: el.domain.domain}
        return temp
    })

    //@ts-ignore
    result.data.DomainPermissionWithDomain = flat

    //@ts-ignore
    console.log("response: ", result.data.DomainPermissionWithDomain)

    //@ts-ignore
    return respond.tracker.domain.get.all.success(res, result.data)

}

const queryCreate = async (req: Request<{}, {}, { queries: IQueryCreate[], organisation_id: string}>, res: Response) => {

    const queryInsert: any = []
    const queryVariantInsert: any = []

    req.body.queries.forEach(query => {
        const query_id = v4()

        queryInsert.push({
            id: query_id,
            domain_id: req.body.queries[0].domain_id,
            query: req.body.queries[0].query,
            created_at: new Date()
        })

        query.device.forEach(device => {
            queryVariantInsert.push({
                id: v4(),
                query_id: query_id,
                search_engine: query.search_engine,
                device: device
            })
        })
        
    })

    const queryResult = await model.query.createMany(queryInsert)
    const queryVariantResult = await model.query_variant.createMany(queryVariantInsert)

    //@ts-ignore
    queryResult.payload.Query.forEach(element => {
        //@ts-ignore
        element.variant = []
        //@ts-ignore
        queryVariantResult.payload.QueryVariant.forEach((variant) => {
            if (variant.query_id == element.id) {
                //@ts-ignore
                element.variant.push(variant)
            }
        })
    })

    //@ts-ignore
    return respond.tracker.query.create.success(res, queryResult.payload.Query)

}

const getAllQueryVariants = async (req: Request<{}, {}, { domain_id: string }>, res: Response) => {

}

class Tracker {
    domain = {
        create: domainCreate,
        get: {
            all: getAllDomains
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