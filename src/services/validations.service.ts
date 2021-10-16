import { Account } from '@prisma/client'
import createError from 'http-errors'
import ValidateEmailDto from '../dtos/validate/req/validate-email.dto'
import prisma from './prisma.service'

export default class ValidationsService {
  static async validateEmail(input: ValidateEmailDto): Promise<Account> {
    const account = await prisma.account.findUnique({
      where: { email: input.email },
    })

    if (!account) {
      throw new createError.UnprocessableEntity('bad request')
    }

    if (account.verifiedAt) {
      throw new createError.UnprocessableEntity('already verified')
    }

    if (account.tokenEmail !== input.tokenEmail) {
      throw new createError.UnprocessableEntity('not validate')
    }

    return prisma.account.update({
      where: { id: account.id },
      data: { verifiedAt: new Date() },
    })
  }
}
