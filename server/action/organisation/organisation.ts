import respond from '../../respond/respond'
import {Request, Response} from 'express'
import model from '../../model/model'
import controller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { isOwnerOrMember } from './organisation.util'
import { requestToUser } from '../action.util'
import auth from '../../module/authorization/authorization'

const nameUpdate = async (req: Request, res: Response) => {
    const result = await model.organisation.name.update({ id: req.body.organisation_id, name: req.body.name})
    if (!result.success) return  respond.organisation.name.update.fail(res)
    return respond.organisation.name.update.success(res, req.body.name )
}


const userAdd = async (req: Request, res: Response) => {
    let user = await model.user.findUniqueEmail(req.body.email)

    if (!user) {
        const result = await controller.user.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)
        if (!result.success) return respond.organisation.user.add.fail.default(res)
        user = result.data.User
    }

    const relation = await model.userOrganisation.readByOrganisationAndUser({
        user_id: user.id,
        organisation_id: req.body.organisation_id
    })

    if (!relation.success) return respond.organisation.user.add.fail.default(res)
    if (isOwnerOrMember(relation.data.UserOrganisation)) return respond.organisation.user.add.fail.alreadyAOwnerOrMember(res)

    const result = await controller.user.AddToOrganisation(user, {id: req.body.organisation_id}, POSITION.MEMBER)
    if (!result.success) return respond.organisation.user.add.fail.default(res)

    return respond.organisation.user.add.success(res, {
        user,
        user_organisation: result.data.UserOrganisation
    })
}

interface UserDeleteBody {user_id: string, organisation_id: string }

const userDelete = async (req: Request<{}, {}, UserDeleteBody>, res: Response) => {
    const token = await auth.token(req)

    const relation = await model.userOrganisation.readByOrganisationAndUser({
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id
    })

    if (!relation.success) return respond.organisation.user.delete.fail.default(res)

    if (relation.data.UserOrganisation.length < 1) return respond.organisation.user.delete.fail.default(res)
    const userOrg = relation.data.UserOrganisation[0]
    if (!(userOrg.position == POSITION.OWNER)) return respond.organisation.user.delete.fail.userDeleteNoPermissions(res)

    const result = await model.userOrganisation.delete({
        user_id: req.body.user_id,
        organisation_id: req.body.organisation_id,
        position: POSITION.MEMBER
    })

    if(!result.success) return respond.organisation.user.delete.fail.default(res)
    return respond.organisation.user.delete.success(res)
}

const userGet = async (req: Request<{}, {}, { organisation_id: string}>, res: Response) => {
    const result = await model.userOrganisation.getUsers({ organisation_id: req.body.organisation_id})

    if (!result.success) return  

    const user_organisation = result.data.UserOrganisation.map((userOrg) => ({
        user_id: userOrg.user_id,
        organisation_id: userOrg.organisation_id,
        position: userOrg.position,
        ...userOrg.user
    }))

    return respond.organisation.user.get.success(res, user_organisation)
}


class OrganisationAction {
    name = {
        update: nameUpdate
    }
    user = {
        get: userGet,
        add: userAdd,
        delete: userDelete
    }
}


export default new OrganisationAction()