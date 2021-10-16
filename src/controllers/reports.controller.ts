import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import CommentReportDto from '../dtos/reports/req/comment-report.dto'
import ReportsService from '../services/reports.service'
import PostReportDto from '../dtos/reports/req/post-report.dto'
import UserDto from '../dtos/accounts/req/user.dto'

const commentReport = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const { commentId } = req.params
  const dto = plainToClass(CommentReportDto, {
    commentId,
    accountId: userdto.id,
    description: req.body.description,
  })
  await dto.isValid()
  const report = await ReportsService.reportComment(dto)

  res.send({
    data: report,
    message: 'comment report create',
  })
}

const postReport = async (req: Request, res: Response) => {
  const userdto = plainToClass(UserDto, req.user)
  await userdto.isValid()
  const { postId } = req.params
  const dto = plainToClass(PostReportDto, {
    postId,
    accountId: userdto.id,
    description: req.body.description,
  })
  await dto.isValid()
  const report = await ReportsService.reportPost(dto)

  res.send({
    data: report,
    message: 'post report create',
  })
}

export { commentReport, postReport }
