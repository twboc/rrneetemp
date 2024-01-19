import CONFIG from './../config'
import { initPage, setTimeoutError, onConsole } from './../util/util'
import pt, { Browser, ConsoleMessage } from 'puppeteer'
import { MAX_RESULTS, MAX_LINKS } from './../const/const'
import { IOrder, ICrawlResult, ISerpPage } from './../type/type'
import puppeteer from 'puppeteer-extra'
import { scan } from './crawl.scan'


export const crawl = (order: IOrder): Promise<ICrawlResult> => {

    console.log("Processing: ", order.params.query)

    const crawlResult = new Promise<ICrawlResult>((resolve, reject) => {

        puppeteer
        //@ts-ignore
        .launch(CONFIG.PUPPETEER)
        .then(async (browser: Browser) => {

            let organicResultsLength = 0
            let organicResults: ISerpPage[] = []

            const page = await initPage(order, browser)

            page.on('console', onConsole);

            setTimeoutError(resolve, reject, organicResults, page, browser)
    
            while(organicResultsLength < MAX_RESULTS){
                    
                const evaluate = await page.evaluate(scan)
    
                organicResultsLength = evaluate.links.length
                organicResults = evaluate.links.slice(0, MAX_LINKS)

                if (!(evaluate.overlookedResults == null)) {
                    break
                }

            }

            await browser.close()
    
            console.log("FINISHED")
            resolve({
                success: true,
                serp: organicResults
            })

        })

    })

    return crawlResult

}