import { Account, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import nodemailer from 'nodemailer'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import sendEmail from '../../utils/send-email'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'
import ValidationsService from '../validations.service'
import ValidateEmailDto from '../../dtos/validate/req/validate-email.dto'

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

let globalAccount: Account
let globalAccount2: Account

beforeAll(async () => {
  await prisma.$connect()
  await prisma.account.deleteMany()
  globalAccount = await prisma.account.create({
    data: {
      email: 'mail1@mail.com',
      name: 'Christian',
      password: 'password',
      verifiedAt: new Date(),
      tokenEmail: 'token',
    },
  })

  globalAccount2 = await prisma.account.create({
    data: {
      email: 'mail2@mail.com',
      name: 'Efrain',
      password: 'password',
      tokenEmail: 'tokenEmail',
    },
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Validations Service', () => {
  it('should throw an error if account does not exist', async () => {
    expect(async () => {
      await ValidationsService.validateEmail({
        email: 'notEmail',
      } as ValidateEmailDto)
    }).rejects.toThrow()
  })

  it('should throw an error if account is verified', async () => {
    expect(async () => {
      await ValidationsService.validateEmail(
        plainToClass(ValidateEmailDto, globalAccount),
      )
    }).rejects.toThrow()
  })

  it('should throw an error if token does not match', async () => {
    expect(async () => {
      await ValidationsService.validateEmail(
        plainToClass(ValidateEmailDto, {
          ...globalAccount2,
          tokenEmail: 'tokensss',
        }),
      )
    }).rejects.toThrow()
  })

  it('shoud update account', async () => {
    const account = await ValidationsService.validateEmail(
      plainToClass(ValidateEmailDto, globalAccount2),
    )

    expect(account.tokenEmail).toBeTruthy()
  })
})
