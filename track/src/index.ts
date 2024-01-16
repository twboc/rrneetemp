import utils from 'util'
import { IOrder } from './type/type'
import model from '../../server/model/model'
import { crawl } from './crawl/crawl'

import {v4} from 'uuid'
import CONFIG from './config'
import util from './util/util'
import pt from 'puppeteer'
import { MAX_RESULTS } from './const/const'

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

            const serp = await crawl({
                params: {
                    adTest: 'on',
                    hl: 'PL',
                    query: order.query_variant.query.query,
                    device: order.query_variant.device
                }
            })

            console.log("SERP: ", serp)
            
        }

    }

    return

}


run()

