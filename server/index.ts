import express, {Request, Response} from 'express'
import path from 'path'
import config from '../config/config.dev.json'

import {googleOauthRedirect} from './auth/google'
import {facebookOauthRedirect} from './auth/facebook'
import {dropboxOauthRedirect} from './auth/dropbox'

const app = express()

const serve = (filePath: string) => (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + filePath))

const serveIndex = serve('/../public/index.html')

app.get('/', serveIndex)
app.get('/Login', serveIndex)
app.get('/App', serveIndex)

app.get('/google/ouath2/redirect', googleOauthRedirect)
app.get('/dropbox/ouath2/redirect', dropboxOauthRedirect)
app.get('/facebook/ouath2/redirect', facebookOauthRedirect)

app.use('/app', express.static(path.resolve(__dirname, '../app')))
app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.listen(config.server.port, () =>
  console.log('Example app listening on port ' + config.server.port),
)
