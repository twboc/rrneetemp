import type {user as IUser} from '@prisma/client'
import Authorization from '../../module/authorization/authorization'

export const checkPassword = (password: string, salt: string, password_hash: string) => Authorization.hashPassword(password, salt).password_hash == password_hash

export const getAuthorization = (user: IUser) => Authorization.create({
    id: user.id,
    email: user.email
})
