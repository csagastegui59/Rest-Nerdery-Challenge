import express, { Router } from 'express'
import passport from 'passport'
import asyncHandler from 'express-async-handler'
import { commentReport, postReport } from '../controllers/reports.controller'

const reportsRouter = express.Router()

function reportsRoutes(): Router {
  reportsRouter.use(passport.authenticate('jwt', { session: false }))
  reportsRouter
    .route('/comments/:commentId/report')
    .post(asyncHandler(commentReport))

  reportsRouter.route('/posts/:postId/report').post(asyncHandler(postReport))

  return reportsRouter
}

export default reportsRoutes
