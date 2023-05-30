import Respond from '../../respond/respond'
import {Request, Response} from 'express'
import model from '../../model/model'
import UserModel from '../../model/user'
import Constroller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { isOwnerOrMember } from './organisation.util'
import { requestToUser } from '../action.util'
import { hasAuthorization, validateAuthorisation } from '../../module/authorization/authorization'

const nameUpdate = async (req: Request, res: Response) => {
    const result = await model.Organisation.updateName({ id: req.body.organisation_id, name: req.body.name})
    if (!result.success) return  Respond.Organisation.ChangeName.Fail(res)
    return Respond.Organisation.ChangeName.Success(res, req.body.name )
}


const userAdd = async (req: Request, res: Response) => {

    let user = await UserModel.findUniqueEmail(req.body.email)

    if (!user) {
        const result = await Constroller.User.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)
        if (!result.success) return Respond.Organisation.UserAdd.Fail.Default(res)
        user = result.data.User
    }

    const relation = await model.UserOrganisation.readByOrganisationAndUser({
        user_id: user.id,
        organisation_id: req.body.organisation_id
    })

    if (!relation.success) return Respond.Organisation.UserAdd.Fail.Default(res)
    if (isOwnerOrMember(relation.data.UserOrganisation)) return Respond.Organisation.UserAdd.Fail.AlreadyAOwnerOrMember(res)

    const result = await Constroller.User.AddToOrganisation(user, {id: req.body.organisation_id}, POSITION.MEMBER)
    if (!result.success) return Respond.Organisation.UserAdd.Fail.Default(res)

    return Respond.Organisation.UserAdd.Success(res, {
        user,
        user_organisation: result.data.UserOrganisation
    })
}

interface UserDeleteBody {user_id: string, organisation_id: string }

const userDelete = async (req: Request<{}, {}, UserDeleteBody>, res: Response) => {
    const authorization = hasAuthorization(req)
    const token = await validateAuthorisation(authorization)

    const relation = await model.UserOrganisation.readByOrganisationAndUser({
        user_id: token.id,
        organisation_id: req.body.organisation_id
    })

    if (!relation.success) return Respond.Organisation.user.delete.fail.default(res)

    if (relation.data.UserOrganisation.length < 1) return Respond.Organisation.user.delete.fail.default(res)
    const userOrg = relation.data.UserOrganisation[0]
    if (!(userOrg.position == POSITION.OWNER)) return Respond.Organisation.user.delete.fail.userDeleteNoPermissions(res)

    const result = await model.UserOrganisation.delete({
        user_id: req.body.user_id,
        organisation_id: req.body.organisation_id,
        position: POSITION.MEMBER
    })

    if(!result.success) return Respond.Organisation.user.delete.fail.default(res)
    return Respond.Organisation.user.delete.success(res)
}

const userGet = async (req: Request<{}, {}, { organisation_id: string}>, res: Response) => {
    const result = await model.UserOrganisation.getUsers({ organisation_id: req.body.organisation_id})

    if (!result.success) return  

    const user_organisation = result.data.UserOrganisation.map((userOrg) => ({
        user_id: userOrg.user_id,
        organisation_id: userOrg.organisation_id,
        position: userOrg.position,
        ...userOrg.user
    }))

    return Respond.Organisation.user.get.success(res, user_organisation)
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