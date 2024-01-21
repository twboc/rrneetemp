import CONFIG from './../config'
import { initPage, setTimeoutError, onConsole } from './../util/util'
import { Browser, HTTPResponse } from 'puppeteer'
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

            let scanBreak = false

            const page = await initPage(order, browser)

            page.on('console', onConsole);

            page.on('response', (res: HTTPResponse) => {

                if (res.status() == 204 && res.url().indexOf('https://consent.google.pl/save?continue=') > -1) {
                    scanBreak = true;
                    console.log("Status: ", res.url())
                    console.log("Status: ", res.status())
                }
                
            })

            setTimeoutError(resolve, reject, organicResults, page, browser)
    
            while(organicResultsLength < MAX_RESULTS){
                    
                const evaluate = await page.evaluate(scan)
    
                organicResultsLength = evaluate.links.length
                organicResults = evaluate.links.slice(0, MAX_LINKS)

                if (scanBreak) {
                    break
                }

                if (!(evaluate.overlookedResults == null)) {
                    break
                }

            }

            await browser.close()

            if (scanBreak) { return }
    
            console.log("FINISHED")
            resolve({
                success: true,
                serp: organicResults
            })

        })

    })

    return crawlResult

}