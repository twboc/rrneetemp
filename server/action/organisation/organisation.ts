import Respond from '../../respond/respond'
import {Request, Response} from 'express'
import model from '../../model/model'

interface Req<T extends ReadableStream<Uint8Array>> extends Request {
    body: T
}

interface IGetById {
    id: string
}

interface IChangeName {
    name: string
}

const ChangeName = async (req: Request, res: Response) => {
    const result = await model.Organisation.updateName({ id: req.body.organisation_id, name: req.body.name})
    if (!result.success) return  Respond.Organisation.ChangeName.Fail(res)
    return Respond.Organisation.ChangeName.Success(res, req.body.name )
}

const AddUser = async (req: Request, res: Response) => {
    // const result = await model.Organisation.updateName({ id: req.body.organisation_id, name: req.body.name})
    // if (!result.success) return  Respond.Organisation.ChangeName.Fail(res)
    // return Respond.Organisation.ChangeName.Success(res, req.body.name )
}

const Get = async (req: Request, res: Response) => {
    // console.log("PARAMS ID: ", req.params.id)
    // const id = req.params.id
    // const result = await Model.Organisation.read({ id: req.params.id })
    // if (!result.success) return 
}



const GetById = async (req: Request, res: Response) => {
    console.log("PARAMS ID: ", req.params.id)
    // const id = req.params.id
    // const result = await Model.Organisation.read({ id: req.params.id })
    // if (!result.success) return 
}

const Update = async (req: Request, res: Response) => {
    console.log("req: ", req.body)
    // return Respond.Success.Login(res, '')
}


class OrganisationAction {
    ChangeName = ChangeName
    AddUser = AddUser
    // not implemented
    Get = Get
    GetById = GetById
    Update = Update
}


export default new OrganisationAction()