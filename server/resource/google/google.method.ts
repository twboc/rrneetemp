import OAuth2GoogleApis from './google.network'

const POSTFORM = OAuth2GoogleApis.caller({
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export {POSTFORM}
