import { HTTPResponse } from 'puppeteer'
import { INoContentBlock } from './../type/type'

export const checkNoContentError = (res: HTTPResponse, noContentBlock: INoContentBlock ) => {
    if (res.status() == 204 && res.url().indexOf('https://consent.google.pl/save?continue=') > -1) {
        noContentBlock.counter = noContentBlock.counter + 1;

        if (noContentBlock.counter  >= 4) {
            noContentBlock.counter = 0;
            noContentBlock.scanStop = true
            noContentBlock.timers.forEach(clearTimeout)
        }

        const timer: NodeJS.Timeout = setTimeout(() => {
            noContentBlock.counter = 0;
        }, 3000)

        noContentBlock.timers.push(timer)
    }
}
