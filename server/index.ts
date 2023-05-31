import express, {Request, Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import config from '../config/config'
import { auth } from './middleware/auth'
import api from './api/api'
import https from 'https'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const serve = (filePath: string) => (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + filePath))

const serveIndex = serve('/../static/index.html')
const serveApp = serve('/../static/app.html')

app.get('/', serveIndex)
app.get('/login', serveIndex)
app.get('/init', auth, serveApp)
app.get('/home', auth, serveApp)
app.get('/app', auth, serveApp)
app.get('/organisations', auth, serveApp)
app.get('/client', auth, serveApp)

app.use('/static', express.static(path.resolve(__dirname, '../static')))

api.addRoutes(app)

const message = () => console.log('Example app listening on port ' + config.server.port)

if (config.server.https){
  https
  .createServer(
    {
      key: fs.readFileSync(config.server.cert.key),
      cert: fs.readFileSync(config.server.cert.cert),
    },
    app
  )
  .listen(config.server.port, message)
}else{
  app.listen(config.server.port, message)
}