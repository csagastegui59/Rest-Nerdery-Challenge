import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {
  create,
  find,
  update,
  deleteOne,
} from '../controllers/comments.controller'

const commentsRouter = express.Router()

function commentsRoutes(): Router {
  commentsRouter
    .route('/:postId/comments')
    .post(
      passport.authenticate('jwt', { session: false }),
      asyncHandler(create),
    )
    .get(asyncHandler(find))
  commentsRouter
    .route('/:postId/comments/:commentId')
    .put(asyncHandler(update))
    .delete(asyncHandler(deleteOne))

  return commentsRouter
}

export default commentsRoutes
