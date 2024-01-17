import { Page, ConsoleMessage, Browser } from 'puppeteer'
import { IOrder, ICrawlResult, ISerpPage } from '../type/type'
import { AD_TEST } from './../const/const'



export const decoratePage = (page: Page) => {
    page.on('console', (msg: ConsoleMessage) => {
        for (let i = 0; i < msg.args().length; ++i)
        console.log(`${msg.args()[i]}`);
    });
}

export const createPage = async (browser: Browser): Promise<Page> => {
    const page: Page = await browser.newPage()
    decoratePage(page)
    return page
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

export const createURL = (order: IOrder) => {
    const mobile = order.params.device == 'mobile'
        ? '&adtest-useragent=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%205_0%20like%20Mac%20OS%20X)%20AppleWebKit/534.46%20(KHTML,%20like%20Gecko)%20Version/5.1%20Mobile/9A334%20Safari/7534.48.3'
        : ''

    return `https://www.google.pl/search?q=${encodeURIComponent(order.params.query)}&adtest=${order.params.adTest || AD_TEST}&hl=${order.params.hl}${mobile}`

}

export const initPage = async (order: IOrder, browser: Browser): Promise<Page> => {
    const URL = createURL(order)
    console.log("URL: ", URL)
    const page = await createPage(browser)
    await page.goto(URL)
    return page
}

export const scrollMore = async (page: Page, order:IOrder) => {
    await autoScroll(page)
    await autoScroll(page)
    await autoScroll(page)
    await more(page, order)
    await more(page, order)
    // await more(page)
}

export const setTimeoutError = (reject: (reason : ICrawlResult) => void, organicResults: ISerpPage[], browser: Browser) => {
    setTimeout(() => {
        browser.close()
        reject({
            success: false,
            error: {
                type: 'timeout'
            },
            serp: organicResults
        });
      }, 60000);
}

export default {
    delay,
    autoScroll,
    accept,
    more,
    createURL
}
