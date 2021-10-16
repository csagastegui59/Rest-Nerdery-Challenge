import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import AccountsService from '../services/accounts.service'
import AccountsPublicDto from '../dtos/accounts/res/accounts-public.dto'
import UpdateAccountDto from '../dtos/accounts/req/update-account.dto'
import UserDto from '../dtos/accounts/req/user.dto'
import MyAccountDto from '../dtos/accounts/res/my-account.dto'

const getReports = async (req: Request, res: Response) => {}

const deletePost = async (req: Request, res: Response) => {}

const deleteComment = async (req: Request, res: Response) => {}

export { getReports, deletePost, deleteComment }
