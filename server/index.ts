import express, {Request, Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import config from '../config/config'

import {googleOauthRedirect} from './auth/google'
import {facebookOauthRedirect} from './auth/facebook'
import {dropboxOauthRedirect} from './auth/dropbox'

import { auth } from './middleware/auth'
import { signup, login, logout } from './action/action'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());

const serve = (filePath: string) => (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + filePath))

const serveIndex = serve('/../public/index.html')

const serveApp = serve('/../public/app.html')

app.get('/', serveIndex)
app.get('/Login', serveIndex)
app.get('/App', auth, serveApp)

app.get('/api/google/ouath2/redirect', googleOauthRedirect)
app.get('/api/dropbox/ouath2/redirect', dropboxOauthRedirect)
app.get('/api/facebook/ouath2/redirect', facebookOauthRedirect)

app.post('/api/signup', signup)
app.post('/api/login', login)
app.get('/api/logout', logout)

app.use('/public', express.static(path.resolve(__dirname, '../public')))
app.use('/site', express.static(path.resolve(__dirname, '../site')))
app.use('/app', express.static(path.resolve(__dirname, '../app')))

app.listen(config.server.port, () =>
  console.log('Example app listening on port ' + config.server.port),
)
