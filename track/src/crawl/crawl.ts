import CONFIG from './../config'
import util, { initPage, scrollMore, setTimeoutError } from './../util/util'
import pt, { Browser, Page } from 'puppeteer'
import { MAX_RESULTS, MAX_LINKS } from './../const/const'
import { IOrder, ICrawlResult, ISerpPage } from './../type/type'



export const crawl = (order: IOrder): Promise<ICrawlResult> => {

    const crawlResult = new Promise<ICrawlResult>((resolve, reject) => {

        let organicResultsLength = 0
        let organicResults: ISerpPage[] = []

        pt
        .launch(CONFIG.PUPPETEER)
        .then(async (browser: Browser) => {

            // try {

                const page = await initPage(order, browser)
                await util.accept(page)
    
                setTimeoutError(reject, organicResults, browser)
    
                while(organicResultsLength < MAX_RESULTS){
                    
                    await scrollMore(page, order)
    
                    organicResults = await page.evaluate(
                        () => {

                            const removeRelatedQuestions = (el: Element) => !el.closest('.related-question-pair')
    
                            const getOrganicLinks = (): Element[] => {
                                const links = Array
                                    .from(document.querySelectorAll('a cite'))
                                    .filter(removeRelatedQuestions)
                                    .map((el: Element) => el.closest('.MjjYud') )

                                return links

                            }

                            const links = getOrganicLinks()
                            .map((main: Element) => {
    
                                const anchor = main.querySelector('a')
                                const meta = main.querySelector('.VwiC3b')
    
                                if (anchor == null) { return { url: '', title: '', description: '' }}
    
                                const url = anchor?.ping.toString().split('&url=')[1]?.split('&ved')[0]
                                const title = anchor?.querySelector('h3')?.textContent
                                const description = meta?.innerHTML || ''
    
                                return {
                                    url,
                                    title,
                                    description,
                                }
    
                            })
    
                            return links
    
                        }
                    )
    
                    organicResultsLength = organicResults.length
                    organicResults = organicResults.slice(0, MAX_LINKS)
    
                }
    
                organicResults = organicResults.slice(0, MAX_LINKS)
    
                await browser.close()
    
                console.log("FINISHED")
    
                resolve({
                    success: true,
                    serp: organicResults
                })
                
            // }catch(e){
            //     console.log("TRY CATCH ERROR: ", e)
            // }

            

        })

    });

    return crawlResult

}