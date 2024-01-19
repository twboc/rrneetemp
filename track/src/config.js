

const PUPPETEER = {
    
    
    // `headless: true` (default) enables old Headless
    // `headless: 'new'` enables new Headless
    // `headless: false` enables “headful” mode.
    // headless: 'new',
    headless: false,
    ignoreHTTPSErrors: true,
    args: ['--start-maximized'],
    defaultViewport: null
}

export default {
    PUPPETEER
}