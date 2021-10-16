import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv' /* load environment variables */
import httpErros, { HttpError } from 'http-errors'
import passport from 'passport'
import router from './router'
import startPassport from './middleware/login-auth.middleware'
import startPassportModerator from './middleware/moderator.middleware'

dotenv.config()

const app = express()
const PORT = process.env.API_PORT || 3000
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

startPassport(passport)
startPassportModerator(passport)

app.use(passport.initialize())
app.use('/', router(app))

app.use('/*', () => {
  throw new httpErros.NotFound('not found')
})

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  if (ENVIROMENT !== 'development') {
    // eslint-disable-next-line no-console
    console.error(err.message)
    // eslint-disable-next-line no-console
    console.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(err)
}

app.use(errorHandler)
app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT} in ${ENVIROMENT}`)
})
