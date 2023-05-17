import jwt from 'jsonwebtoken'
const H24INSEC = 86400

export const TEMP_SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

export interface ITokenData {
    id: string
    email: string
}

export const create = (data: ITokenData) => {
    return jwt.sign(data, TEMP_SECRET, { expiresIn: `${H24INSEC}s` });
}