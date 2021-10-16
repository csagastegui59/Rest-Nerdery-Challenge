import { Post, Comment, Report } from '@prisma/client'
import createError from 'http-errors'
import CommentReportDto from '../dtos/reports/req/comment-report.dto'
import PostReportDto from '../dtos/reports/req/post-report.dto'
import prisma from './prisma.service'

export default class ReportsService {
  private static async validatePost(id: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { id },
      rejectOnNotFound: false,
    })
    if (!post) {
      throw new createError.NotFound('resource does not exist')
    }

    return post
  }

  private static async validateComment(id: string): Promise<Comment> {
    const comment = await prisma.comment.findUnique({
      where: { id },
      rejectOnNotFound: false,
    })
    if (!comment) {
      throw new createError.NotFound('resource does not exist')
    }

    return comment
  }

  private static async validateAccount(id: string): Promise<void> {
    if (!(await prisma.account.count({ where: { id } }))) {
      throw new createError.NotFound('resource does not exist')
    }
  }

  static async reportComment(input: CommentReportDto): Promise<Report> {
    const comment = await this.validateComment(input.commentId)
    await this.validateAccount(input.accountId)

    if (comment.accountId === input.accountId) {
      throw new createError.UnprocessableEntity(
        'the user can not report his comments',
      )
    }

    const prevReport = await prisma.report.findUnique({
      where: {
        commentReport: {
          commentId: input.commentId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevReport) {
      throw new createError.UnprocessableEntity(
        'the user already reports this comment',
      )
    }

    return prisma.report.create({ data: input })
  }

  static async reportPost(input: PostReportDto): Promise<Report> {
    const post = await this.validatePost(input.postId)
    await this.validateAccount(input.accountId)

    if (post.accountId === input.accountId) {
      throw new createError.UnprocessableEntity(
        'the user can not report his posts',
      )
    }

    const prevReport = await prisma.report.findUnique({
      where: {
        postReport: {
          postId: input.postId,
          accountId: input.accountId,
        },
      },
      rejectOnNotFound: false,
    })

    if (prevReport) {
      throw new createError.UnprocessableEntity(
        'the user already reports this posts',
      )
    }

    return prisma.report.create({ data: input })
  }

  static async findReportsByPostId(postId: string): Promise<Report[]> {
    return prisma.report.findMany({ where: { postId } })
  }

  static async findReportsByCommentId(commentId: string): Promise<Report[]> {
    return prisma.report.findMany({ where: { commentId } })
  }

  static async find(): Promise<Report[]> {
    return prisma.report.findMany({})
  }
}
