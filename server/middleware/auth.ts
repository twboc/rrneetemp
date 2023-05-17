import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { TEMP_SECRET } from '../module/auth'


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.query.TOKEN || req.headers['authorization'] && req.headers['authorization'].split(' ')[1] ) as string
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, TEMP_SECRET as string, (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      next()
    })
  }

