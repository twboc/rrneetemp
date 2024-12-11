import {v4} from 'uuid'
import utils from 'util'
import model from '../../../rrneetemp/server/model/model'
import {MAX_LINKS} from './const/const'
import {crawl} from './crawl/crawl'
import {
  ITrackerQueryVariantResult,
  ITrackerDomainOrder,
  ITrackerDomain,
} from '../../../rrneetemp/shared/type/type'
import {removeSubdomain} from './util/domain'
import {delay, randomRange} from './util/util'

console.log('START')

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function (chunkSize: number) {
    var array = this
    return [].concat.apply(
      [],
      //@ts-ignore
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
      }),
    )
  },
})

interface ITrackerDomainOrderWithDomain extends ITrackerDomainOrder {
  domain: ITrackerDomain
}

//@ts-ignore
const processOrder = async (
  domain_order_id: string,
  domain_order: ITrackerDomainOrderWithDomain,
  order: any,
) => {
  const crawlResult = await crawl({
    params: {
      adTest: 'on',
      hl: 'PL',
      query: order.query_variant.query.query,
      device: order.query_variant.device,
      location: order.query_variant.location,
    },
  })

  console.log('crawlResult: ', crawlResult)

  if (crawlResult.success) {
    const checked_at = new Date()
    let queryVariantResultInsert: ITrackerQueryVariantResult[] =
      crawlResult.serp.map((res, index) => {
        let domain

        // TASK::ID Query:
        // For query "data" there was an issue with results from google books

        if (!res.url) {
          return null
        }
        domain = new URL(res.url)

        return {
          id: v4(),
          query_variant_id: order.query_variant.id,
          query_variant_order_id: order.id,
          domain_order_id: domain_order_id,
          checked_at: checked_at,
          position: index,

          domain_full: domain.host,
          domain_secondary: removeSubdomain(domain.host),

          url: res.url,
          // this handles the case of youtube video
          //@ts-ignore
          title:
            typeof res.title === 'string' ||
            (res.title as any) instanceof String
              ? res.title
              : '',
          description: res.description,
          type: order.type,
        }
      })

    queryVariantResultInsert = queryVariantResultInsert.filter(el => el)

    queryVariantResultInsert.slice(0, MAX_LINKS)

    const outsideResults =
      queryVariantResultInsert.filter(
        el => el?.domain_secondary == domain_order.domain.domain,
      ).length <= 0

    if (outsideResults) {
      queryVariantResultInsert.push({
        id: v4(),
        query_variant_id: order.query_variant.id,
        query_variant_order_id: order.id,
        domain_order_id: domain_order_id,
        checked_at: checked_at,
        position: -1,

        domain_full: domain_order.domain.domain,
        domain_secondary: removeSubdomain(domain_order.domain.domain),

        url: '',
        title: '',
        description: '',
        type: order.type,
      })
    }

    const result = await model.query_variant_result.createMany(
      queryVariantResultInsert,
    )

    if (!result.success) {
      return console.log(
        'error - query variant result insert, result: ',
        result,
      )
    }

    await model.query_variant_order.update({
      where: {id: order.id},
      data: {status: 'finished', checked_at},
    })
  }
}

//@ts-ignore
const processChunk = async (
  domain_order_id: string,
  domain_order: ITrackerDomainOrderWithDomain,
  queries: any[],
  chunk_id: string | number,
) => {
  if (queries) {
    let index = 0
    for (const order of queries) {
      index++

      console.log(`Chunk: ${chunk_id}`, `${index}/${queries.length}`)
      //@ts-ignore
      await processOrder(domain_order_id, domain_order, order)

      await delay(randomRange(1000, 4500))
    }
  }
}

const run = async () => {
  const domain_orders = await model.domain_order.getAll()
  if (!domain_orders.success)
    return console.log('ERROR fetching domain_order: ', domain_orders)
  //@ts-ignore
  console.log(
    'orders: ',
    utils.inspect(domain_orders.data.DomainOrder, false, null, true),
  )

  //@ts-ignore
  for (const domain_order of domain_orders.data.DomainOrder) {
    console.log('DOMAIN: ', domain_order.domain.domain)

    if (domain_order.domain.tombstone) {
      continue
    }

    const domain_order_id = domain_order.id
    const query_variant_orders =
      await model.query_variant_order.getAllPendingByDomainOrderId({
        domain_order_id,
      })

    //@ts-ignore
    const queries = query_variant_orders.data.QueryVariantOrder.filter(el => {
      return el.query_variant.device == 'desktop'
    })

    console.log('queries: ', queries.length)

    function shuffle(array: any) {
      let currentIndex = array.length,
        randomIndex

      // While there remain elements to shuffle.
      while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ]
      }

      return array
    }

    shuffle(queries)

    // const chunk = queries.chunk_inefficient(Math.floor(queries.length/3))

    // console.log("chunk ", chunk[0]?.length)

    // console.log("chunk: ", queries.chunk_inefficient(5))

    //@ts-ignore
    processChunk(domain_order_id, domain_order, queries, 0)

    // //@ts-ignore
    // processChunk(domain_order_id, domain_order, chunk[1], 1)

    // //@ts-ignore
    // processChunk(domain_order_id, domain_order, chunk[2], 2)

    // //@ts-ignore
    // processChunk(domain_order_id, domain_order, chunk[3])

    // //@ts-ignore
    // processChunk(domain_order_id, domain_order, chunk[4])
  }

  return
}

run()
