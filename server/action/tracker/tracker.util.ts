import {v4} from 'uuid'
import { ITrackerDomainOrder } from '../../../shared/type/type'

export const createDomainPermission = (domain_id: string, user_id: string, organisation_id: string) => ({
    id: v4(),
    domain_id: domain_id,
    user_id: user_id,
    organisation_id: organisation_id,
    access: 'OWNER'
})

export const createDomainOrder = (domain_id: string): ITrackerDomainOrder => ({
    id: v4(),
    domain_id: domain_id,
    created_at: new Date(),
    finished_at: null,
    status: 'pending',
    type: 'automatic'
})