import express, { Router } from 'express'
import accountsRoutes from './routes/accounts.router'
import authRoutes from './routes/auth.router'
import validationRoutes from './routes/validation.router'
import { postsRoutes, postsRootRoutes } from './routes/posts.router'
import commentsRoutes from './routes/comments.router'
import reportsRoutes from './routes/reports.router'
import forgotRoutes from './routes/forgot.router'
import likesRoutes from './routes/likes.router'

const expressRouter = express.Router()

function router(app: Router): Router {
  app.use('/accounts', accountsRoutes())
  app.use('/', authRoutes())
  app.use('/', validationRoutes())
  app.use('/posts', postsRootRoutes())
  app.use('/accounts', postsRoutes())
  app.use('/posts', commentsRoutes())
  app.use('/forgot-password', forgotRoutes())
  app.use('/', reportsRoutes())
  app.use('/', likesRoutes())

  return expressRouter
}

export default router
