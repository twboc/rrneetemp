import {API_POST} from './resource.api.method'
import {IRes} from './resource.api.type'
import type {
  IDomainListed,
  ITrackerDomain,
  ITrackerDomainStats,
  ITrackerDomainStatsQuery,
} from '../../../shared/type/type'
import URL from '../../../shared/url/url'
import {
  IDomainCreateReq,
  IDomainGetAllReq,
  IDomainidReq,
  IQueryCreate,
} from './resource.api.tracker.type'

class Tracker {
  domain = {
    create: async (req: IDomainCreateReq) =>
      await API_POST<IDomainCreateReq, IRes<ITrackerDomain>>(
        URL.TRACKER.DOMAIN.CREATE,
        req,
      ),
    get: {
      // ITrackerDomain
      all: async (req: IDomainGetAllReq) =>
        await API_POST<
          IDomainGetAllReq,
          IRes<{DomainPermissionWithDomain: IDomainListed[]}>
        >(URL.TRACKER.DOMAIN.GET.ALL, req),
      stats: async (req: IDomainidReq) =>
        await API_POST<IDomainidReq, IRes<ITrackerDomainStats>>(
          URL.TRACKER.DOMAIN.GET.STATS,
          req,
        ),
    },
  }

  query = {
    create: async (req: IQueryCreate) =>
      await API_POST<IQueryCreate, IRes<ITrackerDomainStatsQuery>>(
        URL.TRACKER.QUERY.CREATE,
        req,
      ),
  }
}

export default new Tracker()
