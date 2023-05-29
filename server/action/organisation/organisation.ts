import Respond from '../../respond/respond'
import {Request, Response} from 'express'
import model from '../../model/model'

import UserModel from '../../model/user'
import Model from '../../model/model'
import Constroller from '../../controller/constroller'
import {POSITION} from '../../const/const'
import { isOwnerOrMember } from './organisation.util'
import { requestToUser } from '../action.util'

interface Req<T extends ReadableStream<Uint8Array>> extends Request {
    body: T
}

interface IGetById {
    id: string
}

interface IChangeName {
    name: string
}

const nameUpdate = async (req: Request, res: Response) => {
    const result = await model.Organisation.updateName({ id: req.body.organisation_id, name: req.body.name})
    if (!result.success) return  Respond.Organisation.ChangeName.Fail(res)
    return Respond.Organisation.ChangeName.Success(res, req.body.name )
}


const userAdd = async (req: Request, res: Response) => {
 
    let user = await UserModel.findUniqueEmail(req.body.email)

    if (!user) {
        const result = await Constroller.User.CreateWithOrganisation(requestToUser(req), POSITION.OWNER)
        if (!result.success) return Respond.Auth.UserAdd.Fail.Default(res)
        user = result.data.User
    }

    const relation = await Model.UserOrganisation.readByOrganisationAndUser({
        user_id: user.id,
        organisation_id: req.body.organisation_id
    })

    if (!relation.success) return Respond.Auth.UserAdd.Fail.Default(res)
    if (isOwnerOrMember(relation.data.UserOrganisation)) return Respond.Auth.UserAdd.Fail.AlreadyAOwnerOrMember(res)

    const result = await Constroller.User.AddToOrganisation(user, {id: req.body.organisation_id}, POSITION.MEMBER)
    if (!result.success) return Respond.Auth.UserAdd.Fail.Default(res)

    return Respond.Auth.UserAdd.Success(res, {
        user,
        user_organisation: result.data.UserOrganisation
    })

}
class OrganisationAction {
    name = {
        update: nameUpdate
    }
    user = {
        add: userAdd
    }
}


export default new OrganisationAction()