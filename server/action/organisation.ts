import Respond from '../respond/respond'
import Model from '../model/model'

// app.get('/fruit/:fruitName/:fruitColor', function(req, res) {
//     var data = {
//         "fruit": {
//             "apple": req.params.fruitName,
//             "color": req.params.fruitColor
//         }
//     }; 

//     send.json(data);
// });


interface OrganisationGetRequest extends Request {
    params: {
        id: string
    }
  }



const Get = async (req: Request, res: Response) => {


    // console.log("PARAMS ID: ", req.params.id)

    // const id = req.params.id

    // const result = await Model.Organisation.read({ id: req.params.id })

    // if (!result.success) return 

}


const GetById = async (req: OrganisationGetRequest, res: Response) => {


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
    Get = Get
    GetById = GetById
    Update = Update
}


export default new OrganisationAction()