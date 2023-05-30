import type { IUser } from '../../shared/type/type'
import model from '../model/model'
import {v4} from 'uuid'
import { POSITION } from '../const/const'
import { IUserCreate, DBError } from './user.type'

class UserController {
    CreateWithOrganisation = async (user: IUser, position: POSITION): Promise<IUserCreate | DBError> => {
        let UserInsert = await model.user.create(user)
        if (!UserInsert.success) return UserInsert as DBError
    
        let organisation = await model.organisation
            .create({
                id: v4(),
                name: `My Organisation - ${user.email.split('@')[0]}`,
            })
    
        if (!organisation.success) return organisation as DBError
    
        let User = UserInsert.data.User
        let Organisation = organisation.data.Organisation
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

        let insert = await model.userOrganisation
            .create({
                user_id: User.id,
                organisation_id: Organisation.id,
                position: position
            })
    
        if (!insert.success) return insert as DBError
        
        let UserOrganisation = insert.data.UserOrganisation
        
        return {
            success: true,
            data: {
                UserOrganisation
            }
        }
    }
    
}


export default new UserController()