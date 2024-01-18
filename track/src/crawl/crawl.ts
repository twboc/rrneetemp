import CONFIG from './../config'
import util, { initPage, scrollMore, setTimeoutError } from './../util/util'
import pt, { Browser, ConsoleMessage } from 'puppeteer'
import { MAX_RESULTS, MAX_LINKS } from './../const/const'
import { IOrder, ICrawlResult, ISerpPage } from './../type/type'

export const crawl = (order: IOrder): Promise<ICrawlResult> => {

    const crawlResult = new Promise<ICrawlResult>((resolve, reject) => {

        pt
        //@ts-ignore
        .launch(CONFIG.PUPPETEER)
        .then(async (browser: Browser) => {

            let organicResultsLength = 0
            let organicResults: ISerpPage[] = []

                const page = await initPage(order, browser)
                await util.accept(page)
                await util.accept(page)

                page.on('console', (msg: ConsoleMessage) => {
                    for (let i = 0; i < msg.args().length; ++i)
                    console.log(`${msg.args()[i]}`);
                });
    
                setTimeoutError(resolve, reject, organicResults, page, browser)
    
                while(organicResultsLength < MAX_RESULTS){

                    let overlookedResults: any = null
                    
                    await scrollMore(page, order)

                    const evaluate = await page.evaluate(
                        () => {

                            const removeRelatedQuestions = (el: Element) => !el?.closest('.related-question-pair')
    
                            const getOrganicLinks = (): Element[] => {
                                const links = Array
                                    .from(document && document.querySelectorAll('a cite'))
                                    .filter(removeRelatedQuestions)
                                    .map((el: Element) => el?.closest('.MjjYud') )

                                return links

                            }

                            const links = getOrganicLinks()
                            .map((main: Element) => {

                                if (main == null) { return { url: '', title: '', description: '' }}
    
                                const anchor = main.querySelector('a')
                                const meta = main.querySelector('.VwiC3b')
    
                                if (anchor == null) { return { url: '', title: '', description: '' }}
                                if (meta == null) { return { url: '', title: '', description: '' }}

                                const url = anchor?.ping.toString().split('&url=')[1]?.split('&ved')[0]
                                const title = anchor?.querySelector('h3')?.textContent
                                const description = meta?.innerHTML || ''

                                const result = {
                                    url,
                                    title,
                                    description,
                                }

                                return result
    
                            })

                            overlookedResults = document.querySelector('.ClPXac') //.Pqkn2e
    
                            return {
                                links,
                                overlookedResults
                            }
    
                        }
                    )
    
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