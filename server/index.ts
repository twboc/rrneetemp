import express, {Request, Response} from 'express'
import path from 'path'
import config from '../config/config.dev.json'

import {googleOauthRedirect} from './auth/google'
import {facebookOauthRedirect} from './auth/facebook'
import {dropboxOauthRedirect} from './auth/dropbox'

console.log('__dirname: ', __dirname)

const app = express()

app.get('/', (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + '/../public/index.html')),
)

app.get('/Login', (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + '/../public/index.html')),
)

app.get('/App', (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + '/../public/index.html')),
)

app.get('/google/ouath2/redirect', googleOauthRedirect)
app.get('/dropbox/ouath2/redirect', dropboxOauthRedirect)
app.get('/facebook/ouath2/redirect', facebookOauthRedirect)

app.use('/app', express.static(path.resolve(__dirname, '../app')))
app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.listen(config.server.port, () =>
  console.log('Example app listening on port ' + config.server.port),
)
