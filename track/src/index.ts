
import CONFIG from './config'
import util from './util/util'
import pt from 'puppeteer'
import { MAX_RESULTS } from './const/const'
import { IOrder } from './type/type'

console.log("START")


const order: IOrder = {
    params: {
        query: 'implanty poznań',
        adTest: 'on',
        hl: 'PL',
        device: 'desktop'
    }
}



pt.launch(CONFIG.PUPPETEER)
    .then(async browser => {

        const URL = util.createURL(order)
        const page = await browser.newPage()
        // await page.setViewport({ width: 2000, height: 500 })


        page.on('console', (msg) => {
            for (let i = 0; i < msg.args().length; ++i)
              console.log(`${msg.args()[i]}`);
          });
        
        console.log("URL: ", URL)


        await page.goto(URL)
        await util.accept(page)

        let organicResultsLength = 0
        let organicResults: any[] = []

        while(organicResultsLength < MAX_RESULTS){
            
            await util.autoScroll(page)
            await util.autoScroll(page)
            await util.autoScroll(page)
            await util.more(page)
            await util.more(page)


            organicResults = await page.evaluate(
                
                () => {
                    const extract = true

                    const getTextContent = (el: Element) => extract
                        ? el.textContent
                        : el


                    const removeRelatedQuestions = (el: Element) => !el.closest('.related-question-pair')

                    let result = Array
                        .from(document.querySelectorAll('a cite'))
                        .filter(removeRelatedQuestions);

                    let final = result.map((handle) => {

                        const main = handle.closest('.MjjYud')
                        const anchor = main.querySelector('a')

                        if (anchor == null) { return }

                        const url = anchor?.ping.toString().split('&url=')[1]?.split('&ved')[0]
                        const title = anchor?.querySelector('h3')?.textContent

                        return {
                            url,
                            title
                        }

                    })

                    return final

                }
            
            );

            organicResultsLength = organicResults.length

            // ###########################################################################
            //
            // organicResults = await page.evaluate(() => Array.from(document.querySelectorAll('a cite'), el => el.textContent));
            // console.log("res: ", organicResults)
            // console.log("results: ", organicResults.length)
            // organicResultsLength = organicResults.length
            //
            // ###########################################################################

        }

        organicResults = organicResults.slice(0,100)

        console.log("res: ", organicResults)
        console.log("results: ", organicResults.length)

        console.log("FINISHED")

    })