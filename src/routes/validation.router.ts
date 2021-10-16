import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import validate from '../controllers/validation.controller'

const validationRouter = express.Router()

function validationRoutes(): Router {
  validationRouter
    .route('/validate-email/:tokenEmail')
    .post(asyncHandler(validate))

  return validationRouter
}

export default validationRoutes
