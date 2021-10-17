import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {
  create,
  update,
  find,
  findMyPosts,
  findByAccountId,
  findOne,
  deleteOne,
  modDeleteOne,
} from '../controllers/posts.controller'

const postsRouter = express.Router()
const postsRootRouter = express.Router()

function postsRoutes(): Router {
  postsRouter
    .route('/me/posts')
    .get(
      passport.authenticate('jwt', { session: false }),
      asyncHandler(findMyPosts),
    )
    .post(
      passport.authenticate('jwt', { session: false }),
      asyncHandler(create),
    )

  postsRouter
    .route('/me/posts/:postId')
    .put(passport.authenticate('jwt', { session: false }), asyncHandler(update))
    .delete(
      passport.authenticate('jwt', { session: false }),
      asyncHandler(deleteOne),
    )

  postsRouter.route('/:accountId/posts').get(asyncHandler(findByAccountId))

  postsRouter.route('/:accountId/posts/:postId').get(asyncHandler(findOne))

  return postsRouter
}

function postsRootRoutes(): Router {
  postsRootRouter.route('/').get(asyncHandler(find))

  return postsRootRouter
}

export { postsRoutes, postsRootRoutes }
