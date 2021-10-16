import express, { Router } from 'express'
import passport from 'passport'
import asyncHandler from 'express-async-handler'
import { login, logout, signup } from '../controllers/auth.controller'

const authRouter = express.Router()

function authRoutes(): Router {
  authRouter.route('/login').post(asyncHandler(login))
  authRouter
    .route('/logout')
    .post(
      passport.authenticate('jwt', { session: false }),
      asyncHandler(logout),
    )
  authRouter.route('/signup').post(asyncHandler(signup))

  return authRouter
}

export default authRoutes
