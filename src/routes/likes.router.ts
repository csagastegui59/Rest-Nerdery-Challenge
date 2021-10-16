import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {
  commentsLike,
  commentsDislike,
  postsDislike,
  postsLike,
} from '../controllers/likes.controller'

const likesRouter = express.Router()

function likesRoutes(): Router {
  likesRouter.use(passport.authenticate('jwt', { session: false }))
  likesRouter.route('/posts/:postId/like').post(asyncHandler(postsLike))

  likesRouter.route('/posts/:postId/dislike').post(asyncHandler(postsDislike))

  likesRouter
    .route('/comments/:commentId/like')
    .post(asyncHandler(commentsLike))

  likesRouter
    .route('/comments/:commentId/dislike')
    .post(asyncHandler(commentsDislike))

  return likesRouter
}

export default likesRoutes
