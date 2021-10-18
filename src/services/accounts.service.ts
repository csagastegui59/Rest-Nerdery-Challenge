import { Prisma, Account } from '@prisma/client'
import bcrypt from 'bcryptjs'
import createError from 'http-errors'
import { getToken } from '../utils'
import CreateAccountDto from '../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../dtos/accounts/req/update-account.dto'
import prisma from '../utils/prisma'
import sendEmail from '../utils/send-email'

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
    if (!id) {
      throw new createError.UnprocessableEntity('bad request')
    }

    return prisma.account.update({
      data: input,
      where: {
        id,
      },
    })
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
}
