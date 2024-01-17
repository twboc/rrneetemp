import { v4 } from 'uuid'
import utils from 'util'
import model from '../../server/model/model'
import { crawl } from './crawl/crawl'
import { ITrackerQueryVariantResult } from '../../shared/type/type'


console.log("START")


const run = async () => {

    const domain_orders = await model.domain_order.getAll()
    if (!domain_orders.success) return console.log("ERROR fetching domain_order")
    console.log("orders: ", utils.inspect(domain_orders.data.DomainOrder, false, null, true))

    for (const domain_order of domain_orders.data.DomainOrder) {

        const domain_order_id = domain_order.id

        const query_variant_orders = await model.query_variant_order.getAllPendingByDomainOrderId({ domain_order_id })

        //@ts-ignore
        console.log("queries: ", utils.inspect(query_variant_orders.data.QueryVariantOrder, false, null, true))

        //@ts-ignore
        const queries = query_variant_orders.data.QueryVariantOrder

        for (const order of queries) {


            console.log("order: ", order)

            // return

            const crawlResult = await crawl({
                params: {
                    adTest: 'on',
                    hl: 'PL',
                    query: order.query_variant.query.query,
                    device: order.query_variant.device
                }
            })

            

            if (crawlResult.success) {
                const queryVariantResultInsert: ITrackerQueryVariantResult[] = crawlResult.serp.map((res, index) => {
                    return {
                        id: v4(),
                        query_variant_id: order.query_variant.id,
                        query_variant_order_id: order.id,
                        domain_order_id: domain_order_id,
                        checked_at: new Date(),
                        position: index +1,
                        url: res.url,
                        title: res.title,
                        description: res.description,
                        type: order.type
                    }
                })
                
                const result = await model.query_variant_result.createMany(queryVariantResultInsert)

                if (!result.success) { console.log("error - query variant result insert") }


                console.log("crawlResult: ", crawlResult)

            }

            
            
        }

    }

    return

}


run()

