import { API_POST } from './resource.api.method'
import { IRes } from './resource.api.type'
import type {ITrackerDomain} from '../../../shared/type/type'
import URL from '../../../shared/url/url'

interface IDomainCreateReq {
    domain: string
    organisation_id: string
}

interface IDomainGetAllReq {
    organisation_id: string
}

class Tracker {
    
    create = async (req: IDomainCreateReq) => await API_POST<IDomainCreateReq, IRes<ITrackerDomain>>(URL.TRACKER.DOMAIN.CREATE, req)
    domain = {
        get: {
            // ITrackerDomain
            all: async (req: IDomainGetAllReq) => await API_POST<IDomainGetAllReq, IRes<any>>(URL.TRACKER.DOMAIN.GET.ALL, req)
        }
    }

}

export default new Tracker()