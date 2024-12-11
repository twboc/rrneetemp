import SMP_API_KEY from './smp'

console.log('SMP_API_KEY: ', SMP_API_KEY)

const PUPPETEER = {
  // `headless: true` (default) enables old Headless
  // `headless: 'new'` enables new Headless
  // `headless: false` enables “headful” mode.
  headless: 'new',
  // headless: false,
  // ignoreHTTPSErrors: true,
  // args: ['--start-maximized' ], //'--proxy-server=74.48.66.96:3128'
  // defaultViewport: null,
  executablePath: '/usr/bin/google-chrome-stable',
  spm_apikey: SMP_API_KEY,
  static_bypass: true,
}

export default {
  PUPPETEER,
}
