import { Page, ConsoleMessage, Browser } from 'puppeteer'
import { IOrder, ICrawlResult, ISerpPage } from '../type/type'
import { AD_TEST } from './../const/const'
import { locations } from './locations'

export const createPage = async (browser: Browser): Promise<Page> => {
    return await browser.newPage()
}


function delay(time: Number) {
    return new Promise(function (resolve) {
        //@ts-ignore
        setTimeout(resolve, time)
    })
}

async function autoScroll(page: Page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0
            var distance = 100
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer)
                    //@ts-ignore
                    resolve()
                }
            }, 10)
        })
    })
}

async function accept(page: Page) {
    let selector = 'div'
    await page.$$eval(selector, divs => {
        divs.map((el: Element) => {
            if (el.textContent == 'Zaakceptuj wszystko') {
                //@ts-ignore
                el.click()
                return
            }
        })
    });
}

async function more(page: Page, order:IOrder) {
    let selector = 'div'

    if (order.params.device == 'mobile') {

        await page.evaluate(
            () => {
                console.log("here")
                const next = document.querySelector('div')
                // frGj1b
                console.log("next: ", next)
                //@ts-ignore
                next.click()

            })

    } else {
        await page.$$eval(selector, els => {
            els.map(el => {
                if (el.textContent == 'Więcej wyników') {
                    //@ts-ignore
                    el.click()
                    return
                }
            })
        })
    }
    
}

const getLocation = (location: string) => {

    return location == 'no_location'
        ? ''
        : locations[location]
            ? locations[location]
            : ''
}

export const createURL = (order: IOrder) => {
    const mobile = order.params.device == 'mobile'
        ? '&adtest-useragent=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%205_0%20like%20Mac%20OS%20X)%20AppleWebKit/534.46%20(KHTML,%20like%20Gecko)%20Version/5.1%20Mobile/9A334%20Safari/7534.48.3'
        : ''

    const getQuery = (query: string) => encodeURIComponent(query)
    const getAdTest = (adTest: string) => adTest || AD_TEST
    const getSafe = () => '&safe=images&safe=high'

    return `https://www.google.pl/search?q=${getQuery(order.params.query)}&adtest=${getAdTest(order.params.adTest)}&hl=${order.params.hl}${mobile}${getSafe()}${getLocation(order.params.location)}`

}

export const initPage = async (order: IOrder, browser: Browser): Promise<Page> => {
    const URL = createURL(order)
    const page = await createPage(browser)
    const res = await page.goto(URL)
    return page
}

export const scrollMore = async (page: Page, order:IOrder) => {
    await autoScroll(page)
    await autoScroll(page)
    await autoScroll(page)
    await more(page, order)
    await more(page, order)
}

export const setTimeoutError = (resolve: (reason : ICrawlResult) => void, reject: (reason : ICrawlResult) => void, organicResults: ISerpPage[], page: Page, browser: Browser) => {
    setTimeout(async () => {
        await browser.close()
        resolve({
            success: false,
            error: {
                type: 'timeout'
            },
            serp: organicResults
        });
      }, 100000);
}

export default {
    delay,
    autoScroll,
    accept,
    more,
    createURL
}
