import {IDomainListed} from '../../../shared/type/type'
import TrackerDomainSelectProps from './tracker.domain.select.type'

export const select = (
  props: TrackerDomainSelectProps,
  domain: IDomainListed,
) =>
  props.chageSelectedDomain(
    props.setSelectedDomain,
    props.setStats,
    props.setQueryStatsLoading,
    domain.domain_id,
  )

export const getSelected = (
  props: TrackerDomainSelectProps,
): IDomainListed | undefined =>
  props.domains.filter(domain => domain.domain_id == props.selectedDomain)[0]
