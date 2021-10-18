import { Account, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import nodemailer from 'nodemailer'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import sendEmail from '../../utils/send-email'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'

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

afterAll(async () => {
  await prisma.$disconnect()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Accounts Service', () => {
  it('Should create an account', async () => {
    const dto = { email: 'mail@mail.com', name: 'Efrain', password: 'password' }
    const account = await AccountsService.create(
      plainToClass(CreateAccountDto, dto),
    )
    expect(account.email).toEqual(dto.email)
  })

  it('Should update an account', async () => {
    const dto = plainToClass(UpdateAccountDto, { name: 'New Name' })
    const account = await AccountsService.update(globalAccount.id, dto)
    expect(account.id).toEqual(globalAccount.id)
    expect(account.name).not.toEqual(globalAccount.name)
  })

  it('Should throw an error when no id passed', async () => {
    expect(async () => {
      await AccountsService.update('', {} as UpdateAccountDto)
    }).rejects.toThrow()
  })

  it('Should throw an error when email is already taken', async () => {
    const dto = plainToClass(CreateAccountDto, {
      email: 'mail2@mail.com',
      name: 'jhon',
      password: 'password',
    })

    expect(async () => {
      await AccountsService.create(dto)
    }).rejects.toThrow()
  })

  it('Should not update an account when email is already taken', async () => {
    const dto = plainToClass(UpdateAccountDto, {
      name: 'New Name',
      email: 'mail2@mail.com',
    })
    expect(async () => {
      await AccountsService.update(globalAccount.id, dto)
    }).rejects.toThrow()
  })

  it('should return all accounts', async () => {
    const account = await AccountsService.find()
    expect(Array.isArray(account)).toBe(true)
  })

  it('should return an account by id', async () => {
    const account = await AccountsService.findOne(globalAccount.id)
    expect(account.id).toBe(globalAccount.id)
  })

  it('should return an account by email', async () => {
    const account = await AccountsService.findByEmail(globalAccount.email)
    expect(account.id).toBe(globalAccount.id)
  })

  it('should throw error when no exists id', async () => {
    expect(async () => {
      await AccountsService.findOne('1234567890')
    }).rejects.toThrow()
  })
})
