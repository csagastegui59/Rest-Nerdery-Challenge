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
import UpdateCommentDto from '../../dtos/comments/req/update-comment.dto'
import CreateCommentDto from '../../dtos/comments/req/create-comment.dto'

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
  it('should return an array of comments', async () => {
    const comments = await CommentsService.find()
    expect(Array.isArray(comments)).toBeTruthy()
  })

  it('should return a comment by id', async () => {
    const comment = await CommentsService.findOne(globalComment.id)
    expect(comment).toHaveProperty('id')
  })

  it('should return an array of comments by Post Id', async () => {
    const comments = await CommentsService.findByPostId(globalPost.id)
    expect(Array.isArray(comments)).toBeTruthy()
  })

  it('should return an array of comments by postId and accountId', async () => {
    const comments = await CommentsService.findByOwner(
      globalAccount2.id,
      globalPost.id,
    )
    expect(comments).toHaveProperty('id')
  })

  it('should update a comment by owner', async () => {
    const ownerdto = plainToClass(CommentOwnerDto, {
      accountId: globalAccount.id,
      postId: globalPost.id,
      commentId: globalComment.id,
    })

    const comment = await CommentsService.update(ownerdto, {
      content: 'new comment',
    } as UpdateCommentDto)

    expect(comment).toHaveProperty('id')
  })

  it('should throw an error when comment owner does not exists', async () => {
    const ownerdto = plainToClass(CommentOwnerDto, {
      accountId: '1234567890',
      postId: globalPost.id,
      commentId: globalComment.id,
    })

    expect(async () => {
      await CommentsService.update(ownerdto, {
        content: 'new comment',
      } as UpdateCommentDto)
    }).rejects.toThrow()
  })

  it('should create a comment', async () => {
    const commentdto = plainToClass(CreateCommentDto, {
      content: 'i am creating a comment that change your life',
      postId: globalPost.id,
      accountId: globalAccount.id,
    })

    const comment = await CommentsService.create(commentdto)

    expect(comment).toHaveProperty('id')
  })

  it('should delete a comment by owner', async () => {
    const ownerdto = plainToClass(CommentOwnerDto, {
      accountId: globalAccount.id,
      postId: globalPost.id,
      commentId: globalComment.id,
    })

    const comment = await CommentsService.delete(ownerdto)
    expect(async () => {
      await prisma.comment.findUnique({ where: { id: globalComment.id } })
    }).rejects.toThrow()
  })

  it('should throw an error when comment does not exist', async () => {
    const ownerdto = plainToClass(CommentOwnerDto, {
      accountId: '123456789',
      postId: globalPost.id,
      commentId: globalComment.id,
    })

    expect(async () => {
      const comment = await CommentsService.delete(ownerdto)
    }).rejects.toThrow()
  })
})
