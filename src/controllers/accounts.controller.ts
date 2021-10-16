import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import AccountsService from '../services/accounts.service'
import AccountsPublicDto from '../dtos/accounts/res/accounts-public.dto'
import UpdateAccountDto from '../dtos/accounts/req/update-account.dto'
import UserDto from '../dtos/accounts/req/user.dto'
import MyAccountDto from '../dtos/accounts/res/my-account.dto'

const find = async (req: Request, res: Response) => {
  const accounts = await AccountsService.find()
  const accountsdto = plainToClass(AccountsPublicDto, accounts)
  res.status(200).send({
    data: accountsdto,
  })
}

const findMyAccount = async (req: Request, res: Response) => {
  const dto = plainToClass(UserDto, req.user)
  await dto.isValid()

  const account = await AccountsService.findOne(dto.id)
  const myaccount = plainToClass(MyAccountDto, account)
  res.status(200).send({
    data: myaccount,
  })
}

const update = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  const accountdto = plainToClass(UpdateAccountDto, req.body)
  await userdto.isValid()
  await accountdto.isValid()
  const account = await AccountsService.update(userdto.id, accountdto)
  res.status(200).send({
    data: account,
  })
}

const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  const account = await AccountsService.findOne(id)
  const accountdto = plainToClass(AccountsPublicDto, account)
  res.status(200).send({
    data: accountdto,
  })
}

export { find, findMyAccount, findOne, update }
