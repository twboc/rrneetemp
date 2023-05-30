import type {IUser} from '../../../shared/type/type'
import authorization from '../../module/authorization/authorization'

export const checkPassword = (password: string, salt: string, password_hash: string) => authorization.hashPassword(password, salt).password_hash == password_hash

export const getAuthorization = (user: IUser) => authorization.create({
    id: user.id,
    email: user.email
})
