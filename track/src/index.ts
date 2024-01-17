import { v4 } from 'uuid'
import utils from 'util'
import model from '../../server/model/model'
import { crawl } from './crawl/crawl'
import { ITrackerQueryVariantResult } from '../../shared/type/type'
import { removeSubdomain } from './util/domain'


console.log("START")

const run = async () => {

    const domain_orders = await model.domain_order.getAll()
    if (!domain_orders.success) return console.log("ERROR fetching domain_order")
    //@ts-ignore
    console.log("orders: ", utils.inspect(domain_orders.data.DomainOrder, false, null, true))

    //@ts-ignore
    for (const domain_order of domain_orders.data.DomainOrder) {

        const domain_order_id = domain_order.id

        const query_variant_orders = await model.query_variant_order.getAllPendingByDomainOrderId({ domain_order_id })

        //@ts-ignore
        const queries = query_variant_orders.data.QueryVariantOrder.filter((el) => { return el.query_variant.device == 'desktop'})

         //@ts-ignore
         console.log("queries: ", utils.inspect(queries, false, null, true))

        for (const order of queries) {

            const crawlResult = await crawl({
                params: {
                    adTest: 'on',
                    hl: 'PL',
                    query: order.query_variant.query.query,
                    device: order.query_variant.device
                }
            })

            if (crawlResult.success) {
                const checked_at = new Date()
                let queryVariantResultInsert: ITrackerQueryVariantResult[] = crawlResult.serp.map((res, index) => {

                    let domain;
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
                        title: res.title,
                        description: res.description,
                        type: order.type
                    }
                })

                queryVariantResultInsert = queryVariantResultInsert.filter(el => !el)
                
                const result = await model.query_variant_result.createMany(queryVariantResultInsert)

                if (!result.success) { console.log("error - query variant result insert") }

                await model.query_variant_order.update({
                    where: { id: order.id },
                    data: { status: 'finished', checked_at }
                })


                console.log("crawlResult: ", crawlResult)

            }

            
            
        }

    }

    return

}


run()

