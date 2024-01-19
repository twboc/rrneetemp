import React, { FC, useEffect, useState } from 'react'
import { organisationSelect } from '../../state/organisation/organisation'
import { useSelector } from '../../module/store/store'
import { IUserOrganisationByUser, IDomainListed, ITrackerDomainStats, ITrackerDomainStatsQuery, ITrackerQueryVariantWithResult } from '../../../shared/type/type'
import { getAllDomains, createDomain, createQuery, chageSelectedDomain, addOnEnter } from './tracker.action'
import { domainOnChange, onChange, getSelectedDomain, statsDefault } from './tracker.util'
import TrackerLocation from './tracker.location'
import TrackerBulk from './tracker.bulk'
import TrackerDomainSelect from './tracker.domain.select'

function unique<T>(value: T, index: number, array: T[]) {
    return array.indexOf(value) === index;
  }

export const getSelectQuery = (selectedQueries: string[], setSelectedQueries: React.Dispatch<React.SetStateAction<string[]>>) =>
  (query: ITrackerDomainStatsQuery) =>
    () => {
      selectedQueries.indexOf(query.id) < 0
        ? setSelectedQueries(([...selectedQueries, query.id]).filter(unique))
        : setSelectedQueries(selectedQueries.filter((query_id: string) => query_id != query.id))
    }

export const getSelectAll = (selectedQueries: string[], setSelectedQueries: React.Dispatch<React.SetStateAction<string[]>>, stats: ITrackerDomainStats) =>
    () => {
    selectedQueries.length > 0
        ? setSelectedQueries([])
        : setSelectedQueries([...stats.query.map(el => el.id)])
    }

export const getLocationCheck = (locations: string[], setLocations: React.Dispatch<React.SetStateAction<string[]>>) =>
    (location: string) =>
        () => {
            locations.indexOf(location) < 0
                ? setLocations([...locations, location])
                : setLocations(locations.filter(loc => loc != location))
        }
