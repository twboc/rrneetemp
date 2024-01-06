

const PUPPETEER = {
    headless: false,
    // `headless: true` (default) enables old Headless
    // `headless: 'new'` enables new Headless
    // `headless: false` enables “headful” mode.
    ignoreHTTPSErrors: true,
    args: ['--start-maximized'],
    defaultViewport: null
}

export default {
    PUPPETEER
}