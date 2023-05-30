import type { IUser } from '../../../shared/type/type'
import model from '../../model/model'
import {v4} from 'uuid'
import { POSITION } from '../../const/const'
import { IUserCreate, DBError } from './user.type'

const organisationStruct = (email: string) => ({
    id: v4(),
    name: `My Organisation - ${email.split('@')[0]}`,
})

const userOrganisationStruct = (user_id: string, organisation_id: string, position: string) => ({
    user_id,
    organisation_id,
    position
})

class UserController {
    create = async (user: IUser, position: POSITION = POSITION.OWNER): Promise<IUserCreate | DBError> => {
        let UserInsert = await model.user.create(user)
        if (!UserInsert.success) return UserInsert as DBError
    
        let organisation = await model.organisation.create(organisationStruct(user.email))
    
        if (!organisation.success) return organisation as DBError
    
        let User = UserInsert.data.User
        let Organisation = organisation.data.Organisation
        let UserOrganisationInsert = await this.addToOrganisation(User, Organisation, position)
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

    addToOrganisation = async (User: IUser, Organisation: { id: string }, position: POSITION) => {
        let insert = await model.userOrganisation.create(userOrganisationStruct(User.id, Organisation.id, position))
        if (!insert.success) return insert as DBError
        let UserOrganisation = insert.data.user_organisation
        return {
            success: true,
            data: {
                UserOrganisation
            }
        }
    }
    
}


export default new UserController()