
import CONFIG from './config'
// const pt = require('puppeteer')

import util from './util/util'

import pt from 'puppeteer'

console.log("START")

const AD_TEST = 'on'

const urlParams = {
    query: 'implanty poznań',
    adTest: 'on',
    hl: 'PL'
}


pt.launch(CONFIG.PUPPETEER)
    .then(async browser => {

        const MAX_RESULTS = 110
        const URL = `https://www.google.pl/search?q=${encodeURIComponent(urlParams.query)}&adtest=${urlParams.adTest || AD_TEST}&hl=${urlParams.hl}`

        const page = await browser.newPage()
        // await page.setViewport({ width: 2000, height: 500 })

        
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
            organicResults = await page.evaluate(
                
                () => {
                    const extract = true
                    //@ts-ignore
                    const getTextContent = el => extract
                        ? el.textContent
                        : el

                        //@ts-ignore
                    const removeRelatedQuestions = el => !el.closest('.related-question-pair')

                    const result = Array.from(document.querySelectorAll('a cite'))
                        .filter(removeRelatedQuestions);
                    return Array.from(result, getTextContent)

                }
                
            );

            // console.log("res: ", organicResults)
            // console.log("results: ", organicResults.length)
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