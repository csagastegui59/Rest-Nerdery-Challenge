import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'

const prisma = new PrismaClient({
  rejectOnNotFound: (error) => new createHttpError.NotFound(error.message),
})

export default prisma
