import { Account, Comment, Prisma, Post } from '@prisma/client'
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
import CommentsService from '../comments.service'
import CommentOwnerDto from '../../dtos/comments/req/comment-owner.dto'
import CommentReportDto from '../../dtos/reports/req/comment-report.dto'
import PostReportDto from '../../dtos/reports/req/post-report.dto'
import UpdateCommentDto from '../../dtos/comments/req/update-comment.dto'
import CreateCommentDto from '../../dtos/comments/req/create-comment.dto'
import ReportsService from '../reports.service'

jest.mock('nodemailer', () => {
  return jest.fn()
})

jest.mock('../../utils/send-email', () => {
  return jest.fn()
})

jest.mock('bcryptjs')

jest.mock('../../utils')

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
let globalPost: Post
let globalComment: Comment

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

  globalPost = await prisma.post.create({
    data: {
      title: 'my post',
      content: 'hello world',
      accountId: globalAccount.id,
    },
  })

  globalComment = await prisma.comment.create({
    data: {
      content: 'first comment',
      postId: globalPost.id,
      accountId: globalAccount2.id,
    },
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('comments service', () => {
  it('should return a post if exists', async () => {
    const post = await ReportsService.validatePost(globalPost.id)
    expect(post).toHaveProperty('id')
  })

  it('should throw an error if a post does not exists', async () => {
    expect(async () => {
      await ReportsService.validatePost('1234567890')
    }).rejects.toThrow()
  })

  it('should return a comment if exists', async () => {
    const comment = await ReportsService.validateComment(globalComment.id)
    expect(comment).toHaveProperty('id')
  })

  it('should throw an error if a post does not exists', async () => {
    expect(async () => {
      await ReportsService.validateComment('1234567890')
    }).rejects.toThrow()
  })

  it('should return an error if an account does not exists', async () => {
    expect(async () => {
      await ReportsService.validateAccount('1234567890')
    }).rejects.toThrow()
  })

  it('should return an error if comment does not exist', async () => {
    expect(async () => {
      await ReportsService.reportComment({
        commentId: '1234',
      } as CommentReportDto)
    }).rejects.toThrow()
  })

  it('should return an error if account does not exist', async () => {
    expect(async () => {
      await ReportsService.reportComment({
        commentId: globalComment.id,
        accountId: '123',
      } as CommentReportDto)
    }).rejects.toThrow()
  })

  it('should return an error if account is the same', async () => {
    expect(async () => {
      await ReportsService.reportComment({
        commentId: globalComment.id,
        accountId: globalAccount2.id,
      } as CommentReportDto)
    }).rejects.toThrowError('the user can not report his comments')
  })

  it('shoudl create a report of a comment', async () => {
    const report = await ReportsService.reportComment({
      commentId: globalComment.id,
      accountId: globalAccount.id,
      description: 'reporting',
    } as CommentReportDto)

    expect(report).toHaveProperty('id')
  })

  it('should throw an error when comment report alreaady exists', async () => {
    expect(async () => {
      await ReportsService.reportComment({
        commentId: globalComment.id,
        accountId: globalAccount.id,
        description: 'reporting',
      } as CommentReportDto)
    }).rejects.toThrow('the user already reports this comment')
  })

  it('should return an error if post does not exist', async () => {
    expect(async () => {
      await ReportsService.reportPost({
        postId: '1234',
      } as PostReportDto)
    }).rejects.toThrow()
  })

  it('should return an error if account does not exist', async () => {
    expect(async () => {
      await ReportsService.reportPost({
        postId: globalPost.id,
        accountId: '123',
      } as PostReportDto)
    }).rejects.toThrow()
  })

  it('should return an error if account is the same', async () => {
    expect(async () => {
      await ReportsService.reportPost({
        postId: globalPost.id,
        accountId: globalPost.accountId,
      } as PostReportDto)
    }).rejects.toThrowError()
  })

  it('should create a report of a post', async () => {
    const report = await ReportsService.reportPost({
      postId: globalPost.id,
      accountId: globalAccount2.id,
      description: 'reporting',
    } as PostReportDto)

    expect(report).toHaveProperty('id')
  })

  it('should throw an error when report alreaady exists', async () => {
    expect(async () => {
      await ReportsService.reportPost({
        postId: globalPost.id,
        accountId: globalAccount2.id,
        description: 'reporting',
      } as PostReportDto)
    }).rejects.toThrow()
  })

  it('should return an array of reports by post', async () => {
    const reports = await ReportsService.findReportsByPostId(globalPost.id)
    expect(Array.isArray(reports)).toBeTruthy()
  })

  it('should return an array of reports by comment', async () => {
    const reports = await ReportsService.findReportsByCommentId(
      globalComment.id,
    )
    expect(Array.isArray(reports)).toBeTruthy()
  })

  it('should return an array of reports', async () => {
    const reports = await ReportsService.find()
    expect(Array.isArray(reports)).toBeTruthy()
  })
})
