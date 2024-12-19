import {ITrackerQueryVariantWithResult} from '../../../shared/type/type'

export const getTop = (query_variant: ITrackerQueryVariantWithResult) => {
  return query_variant &&
    (query_variant as ITrackerQueryVariantWithResult).query_variant_result &&
    //@ts-ignore
    (query_variant as ITrackerQueryVariantWithResult).query_variant_result
      ?.length > 0
    ? //@ts-ignore
      (query_variant as ITrackerQueryVariantWithResult)
        .query_variant_result[0] &&
      //@ts-ignore
      query_variant.query_variant_result[0].position == -1
      ? 'FINISHED: > 100'
      : //@ts-ignore
        query_variant.query_variant_result[0]?.position + 1
    : '> 100'
}
