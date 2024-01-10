
import CONFIG from './config'
import util from './util/util'
import pt from 'puppeteer'

console.log("START")

const AD_TEST = 'on'

const urlParams = {
    query: 'implanty poznań',
    adTest: 'on',
    hl: 'PL',
    device: 'desktop'
}


pt.launch(CONFIG.PUPPETEER)
    .then(async browser => {

        const MAX_RESULTS = 110
        const URL = `https://www.google.pl/search?q=${encodeURIComponent(urlParams.query)}&adtest=${urlParams.adTest || AD_TEST}&hl=${urlParams.hl}`

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
        while(organicResultsLength < MAX_RESULTS){
            
            await util.autoScroll(page)
            await util.autoScroll(page)
            await util.autoScroll(page)
            await util.more(page)
            await util.more(page)

            //@ts-ignore
            // let organicResults
            
            
            let organicResults = await page.evaluate(
                
                () => {
                    const extract = true
                    //@ts-ignore
                    const getTextContent = el => extract
                        ? el.textContent
                        : el

                        //@ts-ignore
                    const removeRelatedQuestions = el => !el.closest('.related-question-pair')

                    let result = Array.from(document.querySelectorAll('a cite')) //.MjjYud
                        .filter(removeRelatedQuestions);

                        // .hlcw0c

                    // const result = Array.from(document.querySelectorAll('a cite'))
                    //     .filter(removeRelatedQuestions);


                    let final = result.map((handle) => {

                        const main = handle.closest('.MjjYud')
                        
                        const anchor = main.querySelector('a')

                        if (anchor == null) {
                            return
                        }

                        //@ts-ignore
                        const url = anchor?.ping.toString().split('&url=')[1]?.split('&ved')[0]
                        const title = anchor?.querySelector('h3')?.textContent

                        // console.log()
                        // console.log("########################################")
                        // console.log(url)
                        // console.log(title)

                        return {
                            url,
                            title
                        }

                    })


                    return final


                    // console.log(result)

                    const test = Array.from(result, getTextContent)

                    return test.map(el => ({
                        cite: el
                    }))

                }
                
            );

            console.log("res: ", organicResults)
            console.log("results: ", organicResults.length)
            //@ts-ignore
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

        console.log("FINISHED")

    })