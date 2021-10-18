import { Account, Prisma } from '@prisma/client'
import asy from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { mocked } from 'ts-jest/utils'
import { plainToClass } from 'class-transformer'
import nodemailer from 'nodemailer'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import { generateJWTToken } from '../../utils'
import sendEmail from '../../utils/send-email'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'
import AuthsService from '../auths.service'
import LoginDto from '../../dtos/auths/req/login.dto'

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

jest.mock('bcryptjs')

jest.mock('../../utils')

let globalAccount: Account
let globalAccount2: Account

afterEach(() => {
  jest.clearAllMocks()
})

beforeAll(async () => {
  await prisma.$connect()
  await prisma.account.deleteMany()
  globalAccount = await prisma.account.create({
    data: {
      email: 'mail1@mail.com',
      name: 'Christian',
      password: 'password',
      verifiedAt: new Date(),
      tokenEmail: '1234567890',
    },
  })

  globalAccount2 = await prisma.account.create({
    data: {
      email: 'mail2@mail.com',
      name: 'Efrain',
      password: 'password',
    },
  })
})

describe('auths service', () => {
  it('should throw an error when emai does not exist', async () => {
    expect(async () => {
      await AuthsService.login({
        email: 'me@gmail.co',
        password: 'passs',
      } as LoginDto)
    }).rejects.toThrow('invalid credentials')
  })

  it('should reject login when email is not verified', async () => {
    expect(async () => {
      await AuthsService.login({
        email: 'mail2@mail.com',
        password: '12',
      } as LoginDto)
    }).rejects.toThrow('email not verified')
  })

  it('should reject login when invalid credentials', async () => {
    expect(async () => {
      await AuthsService.login({
        email: 'mail1@mail.com',
        password: 'password',
      } as LoginDto)
    }).rejects.toThrow('invalid credentials')
  })

  it('should return a token', async () => {
    mocked(generateJWTToken).mockImplementation((id: string): string => {
      return 'thisIsASuperSaveToken'
    })

    mocked(bcrypt.compare).mockImplementation(
      (pass1: string, pass2: string) => true,
    )

    const res = await AuthsService.login({
      email: 'mail1@mail.com',
      password: 'password',
    } as LoginDto)

    expect(res).toHaveProperty('token')
    expect(res.token).toEqual('thisIsASuperSaveToken')
  })
})
