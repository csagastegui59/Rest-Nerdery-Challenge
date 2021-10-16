import express, { Router } from 'express'
import passport from 'passport'
import asyncHandler from 'express-async-handler'
import {
  getReports,
  deletePost,
  deleteComment,
} from '../controllers/moderators.controller'

const modeartorRouter = express.Router()

function moderatorRoutes(): Router {
  modeartorRouter.get(
    '/reports',
    passport.authenticate('mi-jwt', { session: false }),
    asyncHandler(getReports),
  )

  modeartorRouter.delete(
    '/posts/:postId',
    passport.authenticate('mi-jwt', { session: false }),
    asyncHandler(deletePost),
  )

  modeartorRouter.delete(
    '/posts/:postId/comments/:commentId',
    passport.authenticate('mi-jwt', { session: false }),
    asyncHandler(deleteComment),
  )

  return modeartorRouter
}

export default moderatorRoutes
