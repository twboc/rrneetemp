import { IOrder } from '../type/type'
import { AD_TEST } from './../const/const'

function delay(time: Number) {
    return new Promise(function (resolve) {
        //@ts-ignore
        setTimeout(resolve, time)
    })
}

//@ts-ignore
async function autoScroll(page) {
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

//@ts-ignore
async function accept(page) {
    let selector = 'div'
    //@ts-ignore
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

//@ts-ignore
async function more(page) {
    let selector = 'div'
    //@ts-ignore
    await page.$$eval(selector, els => {
        //@ts-ignore
        els.map(el => {
            if (el.textContent == 'Więcej wyników') {
                el.click()
                return
            }
        })
    })
}

const createURL = (order: IOrder) => `https://www.google.pl/search?q=${encodeURIComponent(order.params.query)}&adtest=${order.params.adTest || AD_TEST}&hl=${order.params.hl}`





export default {
    delay,
    autoScroll,
    accept,
    more,
    createURL
}
