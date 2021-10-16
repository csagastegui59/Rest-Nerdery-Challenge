import express, { Router } from 'express'
import { create, validate } from '../controllers/forgot.controller'

const forgotRouter = express.Router()

function forgotRoutes(): Router {
  forgotRouter.route('/').post(create)
  forgotRouter.route('/:token').post(validate)

  return forgotRouter
}

export default forgotRoutes
