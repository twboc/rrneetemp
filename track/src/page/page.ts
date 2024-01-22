import { Page, ConsoleMessage, HTTPResponse } from 'puppeteer'
import { delay, randomRange } from './../util/util'
import { checkNoContentError } from '../error/checkError'
import { INoContentBlock } from '../type/type'

export const onConsole = (msg: ConsoleMessage) => {
    for (let i = 0; i < msg.args().length; ++i)
    console.log(`${msg.args()[i]}`);
}


export const exposeFunctions = async (page: Page) => {
    await page.exposeFunction('delay', delay)
    await page.exposeFunction('randomRange', randomRange)
}


export const addListeners = async (page: Page, noContentBlock: INoContentBlock) => {

    page.on('console', onConsole)
    page.on('response', (res: HTTPResponse) => {
        // console.log("Status: ", res.url())
        // console.log("Status: ", res.status())
        checkNoContentError(res, noContentBlock)

    })
    
}