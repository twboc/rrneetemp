import express, {Request, Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import config from '../config/config'
import { auth } from './middleware/auth'
import Api from './api/api'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const serve = (filePath: string) => (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname + filePath))

const serveIndex = serve('/../public/index.html')
const serveApp = serve('/../public/app.html')

app.get('/', serveIndex)
app.get('/Login', serveIndex)
app.get('/App', auth, serveApp)

app.use('/public', express.static(path.resolve(__dirname, '../public')))
app.use('/site', express.static(path.resolve(__dirname, '../site')))
app.use('/app', express.static(path.resolve(__dirname, '../app')))

Api.AddRoutes(app)

app.listen(config.server.port, () =>
  console.log('Example app listening on port ' + config.server.port),
)
