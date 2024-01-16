import CONFIG from './../config'
import util from './../util/util'
import pt, { Browser, ConsoleMessage, Page } from 'puppeteer'
import { MAX_RESULTS } from './../const/const'
import { IOrder } from './../type/type'

interface ICrawlResult {
    success: boolean,
    serp: ISerpPage[]
}

interface ISerpPage {
    url: string
    title: string
    // description: string
}

const decoratePage = (page: Page) => {
    page.on('console', (msg: ConsoleMessage) => {
        for (let i = 0; i < msg.args().length; ++i)
        console.log(`${msg.args()[i]}`);
    });
}

const createPage = async (browser: Browser): Promise<Page> => {
    const page: Page = await browser.newPage()
    decoratePage(page)
    return page
}

export const crawl = (order: IOrder): Promise<ICrawlResult> => {

    const crawlData = new Promise<ICrawlResult>((resolve, reject) => {

        pt
        .launch(CONFIG.PUPPETEER)
        .then(async (browser: Browser) => {

            const URL = util.createURL(order)
            let organicResultsLength = 0
            let organicResults: ISerpPage[] = []
            
            const page = await createPage(browser)
            await page.goto(URL)
            await util.accept(page)

            

            setTimeout(() => {
                reject({
                    success: false,
                    serp: organicResults
                });
              }, 60000);

            while(organicResultsLength < MAX_RESULTS){
                
                await util.autoScroll(page)
                await util.autoScroll(page)
                await util.autoScroll(page)
                await util.more(page)
                await util.more(page)

                organicResults = await page.evaluate(
                    () => {

                        const removeRelatedQuestions = (el: Element) => !el.closest('.related-question-pair')

                        let result = Array
                            .from(document.querySelectorAll('a cite'))
                            .filter(removeRelatedQuestions)
                            .map((el: Element) => el.closest('.MjjYud') )

                        let final = result.map((main: Element) => {

                            // const main = handle.closest('.MjjYud')

                            const anchor = main.querySelector('a')
                            const meta = main.querySelector('.VwiC3b')
                            //.yXK7lf.lVm3ye.r025kc.hJNv6b.Hdw6tb
                            // console.log("description: ", meta?.textContent)

                            if (anchor == null) { return }

                            const url = anchor?.ping.toString().split('&url=')[1]?.split('&ved')[0]
                            const title = anchor?.querySelector('h3')?.textContent
                            // const description = meta?.textContent || ''

                            return {
                                url,
                                title,
                                // description,
                            }

                        })

                        return final

                    }
                
                );

                organicResultsLength = organicResults.length
                organicResults = organicResults.slice(0,100)

            }

            organicResults = organicResults.slice(0,100)

            await browser.close()

            console.log("FINISHED")

            resolve({
                success: true,
                serp: organicResults
            })

        })

    });

    return crawlData

}