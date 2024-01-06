function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
}

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
                    resolve()
                }
            }, 10)
        })
    })
}

async function accept(page) {
    let selector = 'div'
        await page.$$eval(selector, divs => {
            divs.map(el => {
                if (el.textContent == 'Zaakceptuj wszystko') {
                    el.click()
                    return
                }
            })
        });
}

async function more(page) {
    let selector = 'div'
    await page.$$eval(selector, els => {
        els.map(el => {
            if (el.textContent == 'Więcej wyników') {
                el.click()
                return
            }
        })
    })
}




export default {
    delay,
    autoScroll,
    accept,
    more
}
