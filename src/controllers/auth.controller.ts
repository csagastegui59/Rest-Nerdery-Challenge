import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import CreateAccountDto from '../dtos/accounts/req/create-account.dto'
import AccountsService from '../services/accounts.service'
import LoginDto from '../dtos/auths/req/login.dto'
import AuthsService from '../services/auths.service'
import AccountInfoDto from '../dtos/accounts/res/account-info.dto'

const login = async (req: Request, res: Response) => {
  const dto = plainToClass(LoginDto, req.body)
  await dto.isValid()
  const token = await AuthsService.login(dto)
  res.send({ data: token })
}

const logout = (req: Request, res: Response) => {
  res.send({
    message: 'logout',
  })
}

const signup = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateAccountDto, req.body)
  await dto.isValid()
  const account = await AccountsService.create(dto)
  const accountinfo = plainToClass(AccountInfoDto, account)

  res.send({
    data: accountinfo,
  })
}

export { login, logout, signup }
