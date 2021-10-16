import { Prisma, Account } from '@prisma/client'
import bcrypt from 'bcryptjs'
import createError from 'http-errors'
import { getToken } from '../utils'
import CreateAccountDto from '../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../dtos/accounts/req/update-account.dto'
import sendEmail from './send-email.service'
import prisma from './prisma.service'

export default class AccountsService {
  static async find(): Promise<Account[]> {
    return prisma.account.findMany({})
  }

  static async findOne(id: string): Promise<Account> {
    return prisma.account.findUnique({ where: { id } })
  }

  static async findByEmail(email: string): Promise<Account> {
    return prisma.account.findUnique({ where: { email } })
  }

  static async update(id: string, input: UpdateAccountDto): Promise<Account> {
    try {
      if (!id) {
        throw new createError.UnprocessableEntity('bad request')
      }
      return prisma.account.update({
        data: input,
        where: {
          id,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new createError.UnprocessableEntity('email already taken')
        }
      }

      throw error
    }
  }

  static async create(input: CreateAccountDto): Promise<Account> {
    const account = await prisma.account.count({
      where: {
        email: input.email,
      },
    })

    if (account) {
      throw new createError.UnprocessableEntity('email already taken')
    }

    const tokenEmail = getToken()
    await sendEmail(input.email, tokenEmail)

    const cryptPass = await bcrypt.hash(input.password, 10)

    return prisma.account.create({
      data: { ...input, tokenEmail, password: cryptPass },
    })
  }

  static async delete(id: string): Promise<Account> {
    if (!id) {
      throw new createError.UnprocessableEntity('bad request')
    }
    const account = await prisma.account.delete({
      where: {
        id,
      },
    })
    return account
  }

  static async exists(id: string): Promise<boolean> {
    const count = await prisma.account.count({ where: { id } })

    return !!count
  }

  static async existsEmail(email: string): Promise<boolean> {
    const count = await prisma.account.count({ where: { email } })
    if (count) {
      throw new createError.UnprocessableEntity('email already exists')
    }

    return false
  }
}
