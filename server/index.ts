import express, { Request, Response } from "express"
import path from 'path'

console.log("__dirname: ", __dirname)

const PORT = 3000

const app = express()

app.get('/', (req: Request, res: Response) => res.sendFile(path.resolve(__dirname + '/../public/index.html')))

app.use('/app', express.static(path.resolve(__dirname, '../app')))
app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
