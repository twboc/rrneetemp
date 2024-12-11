import CONFIG from '../config'
import {initPage, setTimeoutError, createURL, delay} from '../util/util'
import puppeteer, {Browser} from 'puppeteer'
import {MAX_RESULTS, MAX_LINKS} from '../const/const'
import {IOrder, ICrawlResult, ISerpPage, INoContentBlock} from '../type/type'
import {scan} from './crawl.scan'
import {noContentBlockError} from '../error/error'

import zyte from 'zyte-smartproxy-puppeteer'
import {exposeFunctions, addListeners} from '../page/page'

const engine = true ? puppeteer : zyte

export const crawl = (order: IOrder): Promise<ICrawlResult> => {
  console.log('Processing: ', order.params.query)

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

        const noContentBlock: INoContentBlock = {
          scanStop: false,
          counter: 0,
          timers: [],
        }

        await exposeFunctions(page)
        await addListeners(page, noContentBlock)

        setTimeoutError(resolve, reject, organicResults, page, browser)

        while (organicResultsLength < MAX_RESULTS) {
          const evaluate = await page.evaluate(scan)

          await page.waitForNavigation()

          organicResultsLength = evaluate.links.length
          organicResults = evaluate.links.slice(0, MAX_LINKS)

          console.log('organicResultsLength: ', organicResultsLength)

          if (noContentBlock.scanStop) {
            break
          }

          if (!(evaluate.overlookedResults == null)) {
            break
          }
        }

        await delay(3000)

        await browser.close()

        if (noContentBlock.scanStop) {
          return resolve(noContentBlockError(organicResults))
        }

        console.log('FINISHED')
        resolve({
          success: true,
          serp: organicResults,
        })
      })
  })

  return crawlResult
}
