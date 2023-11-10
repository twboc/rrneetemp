import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import {v4} from 'uuid'

export const create = async (req: Request<{}, {}, { domain: string, organisation_id: string}>, res: Response) => {
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

    console.log("data: ", data)

    const result = await model.domain_permission.getDomainsByUserAndOrganisation(data)

    //@ts-ignore
    const flat = result.data.DomainPermissionWithDomain.map((el) => {
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

class Tracker {
    domain = {
        create: create,
        get: {
            all: getAllDomains
        }
    }
}

export default new Tracker()