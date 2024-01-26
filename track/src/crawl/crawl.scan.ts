import { MAX_RESULTS, MAX_LINKS } from './../const/const'
import { IOrder, ICrawlResult, ISerpPage } from './../type/type'

// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
// puppeteer.use(StealthPlugin())

// id="botstuff"

    // '#botstuff .WtZO4e #arc-srp_110 div' 
    // '#botstuff #bres' - related questions
    // hlcw0c - bottom padding
    // .MjjYud .cUnQKe - more questions
    // .MjjYud .g.Ww4FFb.vt6azd.tF2Cxc.asEBEc - standard result
    // .ULSxyf - business cards / porównywarka miejsc
    // '#tadsb .uEierd' - ads
    // .ClPXac - overlooked elements, complain

    // ' .EyBRub .Lv2Cle' -

    // arc-srp_120
    // arc-srp_130
    // arc-srp_140
    // arc-srp_150
    // arc-srp_160
    // arc-srp_170
    // arc-srp_180
    // arc-srp_190
    // arc-srp_1100



//MOBILE
// cz3goc BmP5tf q

    
export const scan = async () => {

    console.log("Scanning...")

    // puppeteer evaluate context does not pass
    // document object and does not allow for querySelector


        const scrollDown = async (document: Document) => {
            await new Promise<void>((resolve) => {
                var totalHeight = 0
                var distance = 100
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight
                    window.scrollBy(0, distance)
                    totalHeight += distance
        
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer)
                        resolve()
                    }
                }, 10)
            })
        }
    
        const more = async () => {
            const more: Element = document.querySelector('.T7sFge.sW9g3e.VknLRd')
            if (more instanceof HTMLElement) {
                more.click()
            }
        }


        const accept = document.querySelector('#L2AGLb')
        if (accept instanceof HTMLElement) {
            accept.click()
        }

        //@ts-ignore
        await delay(randomRange(123,789))

        
        const process = async () => {

            await scrollDown(document)
            await more()
            await scrollDown(document)

            //@ts-ignore
            await delay(randomRange(123,789))

            await scrollDown(document)
            await scrollDown(document)


            const removeRelatedQuestions = (el: Element) => !el?.closest('.related-question-pair')
        
            const getOrganicLinks = (): Element[] => {
                const links = Array
                    .from(document && document.querySelectorAll('a cite, .cz3goc.BmP5tf.q')) // first is for desktop and second for mobile
                    .filter(removeRelatedQuestions)
                    .map((el: Element) => el?.closest('.MjjYud') )
        
                return links
        
            }
        
            const links = getOrganicLinks()
            .map((main: Element) => {
        
                if (main == null) { return { url: '', title: '', description: '' }}
        
                const anchor = main.querySelector('a')
                const meta = main.querySelector('.VwiC3b')

                
        
                if (anchor == null) { console.log('no anchor'); return { url: '', title: '', description: '' }}
                if (meta == null) { console.log('no meta'); return { url: '', title: '', description: '' }}
        
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
        
            const overlookedResults = document.querySelector('.ClPXac') //.Pqkn2e
        
            return {
                links,
                overlookedResults
            }

        }

        // let organicResults: ISerpPage[] = []
        // let organicResultsLength = 0;
        // let evaluate

        // while (organicResultsLength < MAX_RESULTS) {
        //     evaluate = await process()

        //     organicResultsLength = evaluate.links.length
        //     organicResults = evaluate.links.slice(0, MAX_LINKS)

        //     if (!(evaluate.overlookedResults == null)) {
        //         break
        //     }
            
        // }
        
        
        return await process()

    }
