import type { user as IUser } from '@prisma/client'
import Model from '../model/model'
import {v4} from 'uuid'
import { POSITION } from '../const/const'
import { IUserCreate, DBError } from './user.type'

class UserController {
    CreateWithOrganisation = async (user: IUser, position: POSITION): Promise<IUserCreate | DBError> => {
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
        let UserOrganisationInsert = await this.AddToOrganisation(User, Organisation, position)
        if (!UserOrganisationInsert.success) return UserOrganisationInsert as DBError
        let UserOrganisation = UserOrganisationInsert.data.UserOrganisation
        
        return {
            success: true,
            data: {
                User,
                Organisation,
                UserOrganisation
            }
            
        }
    }

    AddToOrganisation = async (User: IUser, Organisation: { id: string }, position: POSITION) => {

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
            data: {
                UserOrganisation
            }
        }
    }
    
}


export default new UserController()