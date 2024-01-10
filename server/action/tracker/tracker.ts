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

    console.log("queryInsert: ", queryInsert)
    console.log("queryVariantInsert: ", queryVariantInsert)


    const queryResult = await model.query.createMany(queryInsert)
    const queryVariantResult = await model.query_variant.createMany(queryVariantInsert)


    console.log("queryResult: ", JSON.stringify(queryResult))
    console.log("queryVariantResult: ", JSON.stringify(queryVariantResult))

    //@ts-ignore
    queryResult.payload.Query.forEach(element => {
        
        

        element.variant = []

        console.log("element: ", element)

        //@ts-ignore
        queryVariantResult.payload.QueryVariant.forEach((variant) => {

            if (variant.query_id == element.id) {

                element.variant.push(variant)
                
            }


        })

    });


    console.log("queryResult AFTER: ", JSON.stringify(queryResult))

    // const result =  await model.query.create({
    //     id: v4(),
    //     domain_id: req.body.queries[0].domain_id,
    //     query: req.body.queries[0].query,
    //     created_at: new Date()
    // })

    // console.log("result: ", result)

}

class Tracker {
    domain = {
        create: domainCreate,
        get: {
            all: getAllDomains
        }
    }

    query = {
        create: queryCreate
    }
}

export default new Tracker()