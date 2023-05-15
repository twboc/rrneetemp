


import {Request, Response} from 'express'

export const signup = async (req: Request, res: Response) => {

    console.log("req: ", req)

    return res.json({
        success: true,
        error: null,
    })
}

export const logout = async (req: Request, res: Response) => {

    return res.redirect('/Login')

}