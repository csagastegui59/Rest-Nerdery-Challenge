import bcrypt from 'bcryptjs'
import createError from 'http-errors'
import LoginDto from '../dtos/auths/req/login.dto'
import TokenDto from '../dtos/auths/res/token.dto'
import { generateJWTToken } from '../utils'
import prisma from './prisma.service'

export default class AuthsService {
  static async login(input: LoginDto): Promise<TokenDto> {
    const account = await prisma.account.findUnique({
      where: { email: input.email },
      rejectOnNotFound: false,
    })

    if (!account) {
      throw new createError.UnprocessableEntity('invalid credentials')
    }

    if (!account.verifiedAt) {
      throw new createError.UnprocessableEntity('email not verified')
    }

    const isValid = await bcrypt.compare(input.password, account.password)

    if (!isValid) {
      throw new createError.UnprocessableEntity('invalid credentials')
    }

    const token = generateJWTToken(account.id)

    return { token }
  }
}
