import CONFIG from './../config'
import { initPage, setTimeoutError, onConsole, createURL } from './../util/util'
import puppeteer, { Browser, HTTPResponse } from 'puppeteer'
import { MAX_RESULTS, MAX_LINKS } from './../const/const'
import { IOrder, ICrawlResult, ISerpPage, INoContentBlock } from './../type/type'
import { scan } from './crawl.scan'
import { noContentBlockError } from '../error/error'
import zyte from 'zyte-smartproxy-puppeteer'

const engine = false ? puppeteer : zyte

const checkNoContentError = (res: HTTPResponse, noContentBlock: INoContentBlock ) => {
    if (res.status() == 204 && res.url().indexOf('https://consent.google.pl/save?continue=') > -1) {
        noContentBlock.counter = noContentBlock.counter + 1;

        if (noContentBlock.counter  >= 4) {
            noContentBlock.counter = 0;
            noContentBlock.scanStop = true
            noContentBlock.timers.forEach(clearTimeout)
        }

        const timer: NodeJS.Timeout = setTimeout(() => {
            noContentBlock.counter = 0;
        }, 3000)

        noContentBlock.timers.push(timer)
    }
}

export const crawl = (order: IOrder): Promise<ICrawlResult> => {

    console.log("Processing: ", order.params.query)

    const crawlResult = new Promise<ICrawlResult>((resolve, reject) => {

        engine
        //@ts-ignore
        .launch(CONFIG.PUPPETEER)
        //@ts-ignore
        .then(async (browser: Browser) => {

            let organicResultsLength = 0
            let organicResults: ISerpPage[] = []
            let noContentScanBreak = false

            const page = await initPage(order, browser)
            const URL = createURL(order)
            const res = await page.goto(URL)

            page.on('console', onConsole);

            const noContentBlock: INoContentBlock = {
                scanStop: false,
                counter: 0,
                timers: []
            }

            page.on('response', (res: HTTPResponse) => {

                console.log("Status: ", res.url())
                console.log("Status: ", res.status())

                checkNoContentError(res, noContentBlock)

            })

            setTimeoutError(resolve, reject, organicResults, page, browser)
    
            while(organicResultsLength < MAX_RESULTS){
                    
                const evaluate = await page.evaluate(scan)
    
                organicResultsLength = evaluate.links.length
                organicResults = evaluate.links.slice(0, MAX_LINKS)

                console.log("organicResultsLength: ", organicResultsLength)

                if (noContentBlock.scanStop) {
                    break
                }

                if (!(evaluate.overlookedResults == null)) {
                    break
                }

            }

            await browser.close()

            if (noContentScanBreak) { return resolve(noContentBlockError(organicResults)) }
    
            console.log("FINISHED")
            resolve({
                success: true,
                serp: organicResults
            })

        })

    })

    return crawlResult

}