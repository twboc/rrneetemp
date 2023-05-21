import type {
    user as IUser,
    organisation as IOrganisation,
    user_organisation as IUserOrganisation
} from '@prisma/client'
import Model from '../model/model'
import {v4} from 'uuid'

interface IUserCreateSuccess {
    success: true
    User: IUser
    Organisation: IOrganisation
    UserOrganisation: IUserOrganisation
}

interface IUserCreateError {
    success: false
    e: Error
}

type IUserCreate = IUserCreateSuccess | IUserCreateError


interface DBError {
    success: false
    error: Error
}

const CreateWithOrganisation = async (user: IUser, position: string): Promise<IUserCreate | DBError> => {
    let UserInsert = await Model.User.create(user)
    if (!UserInsert.success) return UserInsert as DBError

    let OrganisationInsert = await Model.Organisation
        .create({
            id: v4(),
            name: `My Organisation - ${user.email.split('@')[0]}`,
        })

    if (!OrganisationInsert.success) return OrganisationInsert as DBError


    let User = UserInsert.data.User
    let Organisation = OrganisationInsert.data.Organisation

    let UserOrganisationInsert = await Model.UserOrganisation
        .create({
            user_id: User.id,
            organisation_id: Organisation.id,
            position: position
        })

    if (!UserOrganisationInsert.success) return UserOrganisationInsert as DBError

    
    let UserOrganisation = UserOrganisationInsert.data.UserOrganisation
    
    return {
        success: true,
        User,
        Organisation,
        UserOrganisation
    }
}

class UserController {
    CreateWithOrganisation = CreateWithOrganisation
}


export default new UserController()