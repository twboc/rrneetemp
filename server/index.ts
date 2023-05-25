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

const serveIndex = serve('/../static/index.html')
const serveApp = serve('/../static/app.html')

app.get('/', serveIndex)
app.get('/login', serveIndex)
app.get('/init', auth, serveApp)
app.get('/app', auth, serveApp)

app.use('/static', express.static(path.resolve(__dirname, '../static')))

Api.AddRoutes(app)

app.listen(config.server.port, () =>
  console.log('Example app listening on port ' + config.server.port),
)
