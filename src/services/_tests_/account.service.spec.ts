import { Account, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import createHttpError from 'http-errors'
import AccountsService from '../accounts.service'
import prisma from '../../utils/prisma'
import CreateAccountDto from '../../dtos/accounts/req/create-account.dto'
import UpdateAccountDto from '../../dtos/accounts/req/update-account.dto'

// jest.mock('http-errors', () => {
//   return jest.fn()
// })

let globalAccount: Account
let globalAccount2: Account
// beforeEach(() => {
//   ;(createHttpError as jest.MockedFunction<typeof createHttpError>).mockClear()
// })
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
      name: 'Christian',
      password: 'password',
    },
  })
})

afterAll(async () => {
  await prisma.$disconnect()
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

  // it('Should throw an error when email is already taken', async () => {
  //   const dto = plainToClass(UpdateAccountDto, { email: 'mail2@mail.com' })
  //   const account = globalAccount2
  //   expect(account.email).rejects.toThrow()
  // })
})
